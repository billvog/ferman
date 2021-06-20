import { AntDesign, Feather } from "@expo/vector-icons";
import {
  FullChatFragment,
  FullMessageFragment,
  PaginatedMessages,
  SendMessageFormValues,
  useMarkMessageReadMutation,
} from "@ferman-pkgs/controller";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Field, Formik } from "formik";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { ChatMessage } from "../../../components/ChatMessage";
import { ErrorText } from "../../../components/ErrorText";
import { Spinner } from "../../../components/Spinner";
import { colors, paragraph, radius } from "../../../constants/style";
import { InputField } from "../../../form-fields/InputField";
import { ChatNavProps } from "../../../navigation/AppTabs/Stacks/Chat/ParamList";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../../auth/AuthProvider";
import { ChatroomHeader } from "./ChatroomHeader";

interface ChatroomViewProps {
  isLoading: boolean;
  chat: FullChatFragment | null;
  messages: PaginatedMessages | null;
  loadMoreMessages: () => void;
  sendMessage: (values: SendMessageFormValues) => Promise<string | null>;
}

export const ChatroomView: React.FC<ChatroomViewProps> = ({
  isLoading,
  chat,
  messages,
  loadMoreMessages,
  sendMessage,
}) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation<ChatNavProps<"Chatroom">["navigation"]>();

  const { me } = useContext(AuthContext);
  if (!me) return null;

  const [markRead] = useMarkMessageReadMutation();

  const otherUser = chat?.senderId === me?.id ? chat?.reciever : chat?.sender;

  const onFocus = () => {
    navigation.dangerouslyGetParent()?.setOptions({
      tabBarVisible: false,
    } as BottomTabNavigationOptions);

    navigation.setOptions({
      header: () => <ChatroomHeader chat={chat!} otherUser={otherUser!} />,
    } as StackNavigationOptions);
  };

  const onBlur = () => {
    navigation.dangerouslyGetParent()?.setOptions({
      tabBarVisible: true,
    } as BottomTabNavigationOptions);

    navigation.setOptions({
      header: undefined,
    } as StackNavigationOptions);
  };

  useEffect(() => {
    if (!chat?.id || !otherUser) return;

    onFocus();

    const unsubscribeFromFocusEvent = navigation.addListener("focus", onFocus);
    const unsubscribeFromBlurEvent = navigation.addListener("blur", onBlur);

    return () => {
      unsubscribeFromFocusEvent();
      unsubscribeFromBlurEvent();
    };
  }, [chat, navigation]);

  const [latestRead, setLatestRead] = useState(-1);
  useEffect(() => {
    if (!messages?.messages || messages.messages.length <= 0) return;
    const lm = messages.messages[0];
    if (lm.userId === me?.id && lm.read) setLatestRead(lm.id);
  }, [messages?.messages]);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });

  const onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems && viewableItems.length > 0) {
        viewableItems.map((viewToken) => {
          const m = viewToken.item as FullMessageFragment;
          if (viewToken.isViewable && m.userId !== me.id && !m.read) {
            markRead({
              variables: {
                chatId: m.chatId,
                messageId: m.id,
              },
            });
          }
        });
      }
    }
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary100 }}>
      {isLoading && !messages ? (
        <CenterSpinner />
      ) : !chat || !messages ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={{
              flex: 1,
              flexDirection: "column",
            }}
          >
            {messages.messages.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ marginBottom: 24 }}
                  children={
                    <AntDesign
                      name="wechat"
                      size={100}
                      color={colors.accentWashedOut}
                    />
                  }
                />
                <Text
                  style={{
                    ...paragraph,
                    color: colors.primary600,
                  }}
                >
                  {t("chat.no_messages")}
                </Text>
              </View>
            ) : (
              <FlatList
                inverted
                style={{
                  paddingHorizontal: 12,
                }}
                ListHeaderComponent={null}
                ListFooterComponent={() => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 24,
                    }}
                    children={
                      <Spinner
                        size="s"
                        style={{ opacity: messages.hasMore ? 100 : 0 }}
                      />
                    }
                  />
                )}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
                onEndReachedThreshold={0.15}
                onEndReached={loadMoreMessages}
                data={messages.messages}
                keyExtractor={(item) =>
                  `chat:${item.chatId}-message:${item.id}`
                }
                renderItem={({ item: m, index: i }) => (
                  <View
                    style={{ marginVertical: 4 }}
                    children={
                      <ChatMessage showRead={latestRead === m.id} message={m} />
                    }
                  />
                )}
              />
            )}
            <View style={styles.sendMessageFormWrapper}>
              <Formik
                initialValues={{
                  text: "",
                }}
                onSubmit={async (values, { setFieldValue }) => {
                  const error = await sendMessage(values);
                  if (error) {
                    return Alert.alert(t("common.error"), t(error as any));
                  } else setFieldValue("text", "");
                }}
              >
                {({ submitForm, isSubmitting }) => (
                  <View style={styles.sendMessageFormContainer}>
                    <View style={{ flex: 1 }}>
                      <Field
                        name="text"
                        placeholder={t("form.placeholder.message")}
                        component={InputField}
                        multiline={true}
                        extraStyles={{
                          borderRadius: radius.l,
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={submitForm}
                      style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: 12,
                      }}
                    >
                      <Feather
                        name="send"
                        size={19}
                        color={colors.accentHover}
                        style={{
                          opacity: isSubmitting ? 0 : 100,
                        }}
                      />
                      {isSubmitting && (
                        <Spinner
                          size="s"
                          style={{
                            position: "absolute",
                            left: 16,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendMessageFormWrapper: {
    width: "100%",
  },
  sendMessageFormContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.primary100,
  },
});
