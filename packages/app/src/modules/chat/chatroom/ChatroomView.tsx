import { AntDesign } from "@expo/vector-icons";
import {
  FullChatFragment,
  PaginatedMessages,
  SendMessageFormValues,
} from "@ferman-pkgs/controller";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import dayjs from "dayjs";
import { Field, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
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

  const otherUser = chat?.senderId === me?.id ? chat?.reciever : chat?.sender;

  useEffect(() => {
    if (!chat?.id || !otherUser) return;

    const unsubscribeFromFocusEvent = navigation.addListener("focus", (e) => {
      navigation.dangerouslyGetParent()?.setOptions({
        tabBarVisible: false,
      } as BottomTabNavigationOptions);

      navigation.setOptions({
        header: () => <ChatroomHeader chat={chat} otherUser={otherUser} />,
      } as StackNavigationOptions);
    });

    const unsubscribeFromBlurEvent = navigation.addListener("blur", () => {
      navigation.dangerouslyGetParent()?.setOptions({
        tabBarVisible: true,
      } as BottomTabNavigationOptions);

      navigation.setOptions({
        header: undefined,
      } as StackNavigationOptions);
    });

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

  return (
    <View style={{ flex: 1 }}>
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
                onEndReachedThreshold={0.15}
                onEndReached={loadMoreMessages}
                data={messages.messages}
                keyExtractor={(item) =>
                  `chat:${item.chatId}-message:${item.id}`
                }
                renderItem={({ item: m, index: i }) => {
                  const nextMessage = messages.messages[i > 0 ? i - 1 : i];

                  const isFirst = i === messages.messages.length - 1;

                  let label = "";
                  if (
                    new Date(nextMessage?.createdAt).valueOf() -
                      new Date(m.createdAt).valueOf() >
                      1800000 ||
                    isFirst
                  ) {
                    label = dayjs(nextMessage?.createdAt).format(
                      "D MMMM YYYY, h:mm A"
                    );
                  }

                  return (
                    <View style={styles.messageGroupContainer}>
                      {!!label && (
                        <View style={styles.dateGroupLabelContainer}>
                          <Text style={styles.dateGroupLabelText}>{label}</Text>
                        </View>
                      )}
                      <ChatMessage showRead={latestRead === m.id} message={m} />
                    </View>
                  );
                }}
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
                    return Alert.prompt(t("common.error"), t(error as any));
                  } else setFieldValue("text", "");
                }}
              >
                {({ submitForm }) => (
                  <View style={styles.sendMessageFormContainer}>
                    <View style={{ flex: 1 }}>
                      <Field
                        name="text"
                        placeholder={t("form.placeholder.message")}
                        component={InputField}
                        onSubmitEditing={submitForm}
                        extraStyles={{
                          borderRadius: radius.l,
                        }}
                      />
                    </View>
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
  messageGroupContainer: {
    paddingVertical: 6,
  },
  dateGroupLabelContainer: {
    paddingVertical: 24,
  },
  dateGroupLabelText: {
    textAlign: "center",
    color: colors.primary450,
  },
  sendMessageFormWrapper: {
    width: "100%",
  },
  sendMessageFormContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.primary100,
  },
});
