import { gql } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";
import {
  MessagesDocument,
  OnMessageDeletedDocument,
  OnMessageDeletedSubscription,
  OnMessageDeletedSubscriptionVariables,
  OnMessageUpdatedDocument,
  OnMessageUpdatedSubscription,
  OnMessageUpdatedSubscriptionVariables,
  OnNewMessageDocument,
  OnNewMessageSubscription,
  OnNewMessageSubscriptionVariables,
  useChatQuery,
  useMessagesQuery,
  useSendMessageMutation,
} from "@ferman-pkgs/controller";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import dayjs from "dayjs";
import { Field, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { ChatMessage } from "../../../components/ChatMessage";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import { colors, paragraph, radius } from "../../../constants/style";
import { InputField } from "../../../form-fields/InputField";
import { HomeNavProps } from "../../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../../auth/AuthProvider";
import { ChatroomHeader } from "./ChatroomHeader";

export const ChatroomController: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"Chatroom">) => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);

  const {
    data: chatData,
    loading: chatLoading,
    error: chatError,
  } = useChatQuery({
    skip: typeof route.params.chatId === "undefined",
    variables: {
      chatId: route.params.chatId,
    },
  });

  const {
    data: messagesData,
    error: messagesError,
    loading: messagesLoading,
    fetchMore: loadMoreMessages,
    variables: messagesVariables,
    subscribeToMore: subscribeToMoreMessages,
    client,
  } = useMessagesQuery({
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    skip:
      typeof chatData?.chat.chat === "undefined" || !chatData?.chat.chat?.id,
    variables: {
      chatId: chatData?.chat.chat?.id || "",
      limit: 30,
      skip: 0,
    },
  });

  const otherUser =
    chatData?.chat.chat?.senderId === me?.id
      ? chatData?.chat.chat?.reciever
      : chatData?.chat.chat?.sender;

  useEffect(() => {
    if (!chatData?.chat.chat?.id || !otherUser) return;

    // hide bottom nav
    navigation.dangerouslyGetParent()?.setOptions({
      tabBarVisible: false,
    } as BottomTabNavigationOptions);

    // custom header
    navigation.setOptions({
      header: () => (
        <ChatroomHeader chat={chatData.chat.chat!} otherUser={otherUser} />
      ),
    } as StackNavigationOptions);

    const unsubFromNewMessage = subscribeToMoreMessages<
      OnNewMessageSubscription,
      OnNewMessageSubscriptionVariables
    >({
      document: OnNewMessageDocument,
      variables: {
        chatId: chatData.chat.chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.onNewMessage) return prev;

        if (subscriptionData.data.onNewMessage) {
          const m = subscriptionData.data.onNewMessage;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment __ on Chat {
                latestMessage
              }
            `,
            data: {
              latestMessage: m,
            },
          });
        }

        return {
          messages: {
            ...prev.messages,
            messages: [
              subscriptionData.data.onNewMessage,
              ...prev.messages.messages,
            ],
          },
        };
      },
    });

    const unsubFromMessageUpdated = subscribeToMoreMessages<
      OnMessageUpdatedSubscription,
      OnMessageUpdatedSubscriptionVariables
    >({
      document: OnMessageUpdatedDocument,
      variables: {
        chatId: chatData.chat.chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onMessageUpdated) {
          const m = subscriptionData.data.onMessageUpdated;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment ___ on Chat {
                latestMessage
              }
            `,
            data: {
              latestMessage: m,
            },
          });
        }

        return prev;
      },
    });

    const unsubFromMessageDeleted = subscribeToMoreMessages<
      OnMessageDeletedSubscription,
      OnMessageDeletedSubscriptionVariables
    >({
      document: OnMessageDeletedDocument,
      variables: {
        chatId: chatData.chat.chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onMessageDeleted) {
          client.cache.evict({
            id: "Message:" + subscriptionData.data.onMessageDeleted,
          });

          return (
            client.cache.readQuery({
              query: MessagesDocument,
              variables: messagesVariables,
            }) || prev
          );
        }

        return prev;
      },
    });

    return () => {
      navigation.dangerouslyGetParent()?.setOptions({
        tabBarVisible: true,
      } as BottomTabNavigationOptions);

      unsubFromNewMessage();
      unsubFromMessageUpdated();
      unsubFromMessageDeleted();
    };
  }, [chatData?.chat.chat]);

  const [sendMessage] = useSendMessageMutation();

  const [latestRead, setLatestRead] = useState(-1);
  useEffect(() => {
    if (!messagesData?.messages.messages) return;
    const lm = messagesData?.messages.messages[0];
    if (lm.userId === me?.id && lm.read) setLatestRead(lm.id);
  }, [messagesData?.messages.messages]);

  if (!me) return null;
  return (
    <View style={{ flex: 1 }}>
      {chatLoading || (messagesLoading && !messagesData) ? (
        <CenterSpinner />
      ) : (!chatData && chatData) || (!messagesData && messagesError) ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
      ) : (
        <View style={styles.container}>
          {messagesData?.messages.count === 0 ? (
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
            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <ScrollViewLoadMore
                isReversed
                keepScrollToBottom
                isLoading={messagesLoading}
                onLoadMore={() => {
                  loadMoreMessages({
                    variables: {
                      ...messagesVariables,
                      skip: messagesData?.messages.messages.length,
                    },
                    updateQuery: (prev: any, { fetchMoreResult }) => {
                      return {
                        messages: {
                          ...fetchMoreResult.messages,
                          messages: [
                            ...prev.messages.messages,
                            ...fetchMoreResult.messages.messages,
                          ],
                        },
                      };
                    },
                  });
                }}
                shouldLoadMore={messagesData?.messages.hasMore || false}
                scrollViewProps={{
                  style: {
                    flex: 1,
                  },
                }}
              >
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column-reverse",
                      padding: 12,
                    }}
                  >
                    {messagesData?.messages.messages.map((m, i) => {
                      const nextMessage =
                        messagesData.messages.messages[i > 0 ? i - 1 : i];

                      const isFirst =
                        i === messagesData.messages.messages.length - 1;

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
                        <View
                          key={`chat:${m.chatId}-message:${m.id}`}
                          style={{
                            paddingVertical: 6,
                          }}
                        >
                          <ChatMessage
                            showRead={latestRead === m.id}
                            message={m}
                          />
                          {!!label && (
                            <View style={styles.dateGroupLabelContainer}>
                              <Text style={styles.dateGroupLabelText}>
                                {label}
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    })}
                  </View>
                </KeyboardAvoidingView>
              </ScrollViewLoadMore>
              <View
                style={{
                  width: "100%",
                }}
              >
                <Formik
                  initialValues={{
                    text: "",
                  }}
                  onSubmit={async (values, { setFieldValue }) => {
                    const { data } = await sendMessage({
                      variables: {
                        chatId: chatData!.chat.chat!.id,
                        options: values,
                      },
                    });

                    if (data?.sendMessage.error) {
                      return Alert.alert(
                        t("common.error"),
                        t(`form.error.${data.sendMessage.error.message}` as any)
                      );
                    }

                    setFieldValue("text", "");
                  }}
                >
                  {({ submitForm }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        backgroundColor: colors.primary100,
                      }}
                    >
                      <View style={{ flex: 1, marginRight: 8 }}>
                        <Field
                          name="text"
                          placeholder={"Message..."}
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
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateGroupLabelContainer: {
    paddingVertical: 24,
  },
  dateGroupLabelText: {
    textAlign: "center",
    color: colors.primary450,
  },
});
