import { gql } from "@apollo/client";
import { ChatMessageMax } from "@ferman-pkgs/common";
import {
  FullChatFragment,
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
  useMessagesQuery,
  useSendMessageMutation,
} from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { RiWechatFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { ChatMessage } from "../../../components/ChatMessage";
import { ErrorText } from "../../../components/ErrorText";
import { InputField } from "../../../components/InputField";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../../types/WithAuthProps";

interface ChatControllerProps extends WithAuthProps {
  chat: FullChatFragment | null | undefined;
}

export const ChatController: React.FC<ChatControllerProps> = ({
  loggedUser,
  chat,
}) => {
  const { t } = useTypeSafeTranslation();
  const screenType = useScreenType();

  const {
    data: messagesData,
    loading: messagesLoading,
    fetchMore: fetchMoreMessages,
    variables: messagesVariables,
    subscribeToMore: subscribeToMoreMessages,
    client,
  } = useMessagesQuery({
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    skip: typeof chat === "undefined" || !chat?.id,
    variables: {
      chatId: chat?.id || "",
      limit: 30,
      skip: 0,
    },
  });

  useEffect(() => {
    if (!chat) return;

    const unsubFromNewMessage = subscribeToMoreMessages<
      OnNewMessageSubscription,
      OnNewMessageSubscriptionVariables
    >({
      document: OnNewMessageDocument,
      variables: {
        chatId: chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.onNewMessage) return prev;

        if (subscriptionData.data.onNewMessage) {
          const m = subscriptionData.data.onNewMessage;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment _ on Chat {
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
        chatId: chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onMessageUpdated) {
          const m = subscriptionData.data.onMessageUpdated;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment _ on Chat {
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
        chatId: chat.id,
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
      unsubFromNewMessage();
      unsubFromMessageUpdated();
      unsubFromMessageDeleted();
    };
  }, [chat?.id]);

  const [sendMessage] = useSendMessageMutation();

  const [latestRead, setLatestRead] = useState(-1);
  useEffect(() => {
    if (!messagesData?.messages.messages) return;
    const lm = messagesData?.messages.messages[0];
    if (lm.userId === loggedUser?.id && lm.read) setLatestRead(lm.id);
  }, [messagesData?.messages.messages]);

  return (
    <>
      {!loggedUser ||
      typeof chat === "undefined" ||
      (messagesLoading && !messagesData) ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !chat ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="flex-1 h-full flex flex-col">
          <div
            className="flex flex-1 flex-col-reverse overflow-y-auto p-1"
            style={{
              maxHeight: `calc(100vh - 57px - 65px ${
                screenType === "fullscreen" ? "- 56px" : ""
              })`,
            }}
          >
            {messagesData?.messages.count === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="mb-2 text-accent">
                  <RiWechatFill size="96px" />
                </div>
                <div className="text-primary-400">{t("chat.no_messages")}</div>
              </div>
            ) : (
              <>
                {messagesData?.messages.messages.map((message, index) => {
                  const nextMessage =
                    messagesData.messages.messages[
                      index > 0 ? index - 1 : index
                    ];

                  const isFirst =
                    index === messagesData.messages.messages.length - 1;

                  let label = "";
                  if (
                    new Date(nextMessage?.createdAt).valueOf() -
                      new Date(message.createdAt).valueOf() >
                      1800000 ||
                    isFirst
                  ) {
                    label = dayjs(nextMessage?.createdAt).format(
                      "D MMMM YYYY, h:mm A"
                    );
                  }

                  return (
                    <div
                      key={`${chat.id}:group-message:${message.id}`}
                      className={`flex flex-1 ${
                        isFirst ? "flex-col-reverse" : "flex-col"
                      }`}
                    >
                      <ChatMessage
                        me={loggedUser}
                        message={message}
                        showRead={latestRead === message.id}
                      />
                      {!!label && (
                        <div className="w-full text-center text-primary-450 py-4">
                          {label}
                        </div>
                      )}
                    </div>
                  );
                })}
                {messagesData?.messages.hasMore && (
                  <div className="mx-auto p-4">
                    <MyButton
                      isLoading={messagesLoading}
                      onClick={() => {
                        fetchMoreMessages({
                          variables: {
                            ...messagesVariables,
                            skip: messagesData.messages.messages.length,
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
                    >
                      {t("common.load_more")}
                    </MyButton>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="border-t p-3 bg-white">
            <Formik
              initialValues={{
                text: "",
              }}
              onSubmit={async (values, { setFieldValue }) => {
                const { data } = await sendMessage({
                  variables: {
                    chatId: chat.id,
                    options: values,
                  },
                });

                if (data?.sendMessage.error) {
                  return toast.error(
                    t(`form.error.${data.sendMessage.error.message}` as any)
                  );
                }

                setFieldValue("text", "");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-row items-center leading-normal space-x-2">
                  <InputField
                    name="text"
                    type="text"
                    placeholder="Message..."
                    maxLength={ChatMessageMax}
                    disabled={isSubmitting}
                  />
                  <MyButton isLoading={isSubmitting} type="submit">
                    Send
                  </MyButton>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
