import {
  FullChatFragment,
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  useMarkMessageReadMutation,
  useMessagesQuery,
  useSendMessageMutation,
} from "@ferman-pkgs/controller";
import { Waypoint } from "react-waypoint";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { createRef, useEffect } from "react";
import { ChatMessage } from "../../../components/ChatMessage";
import { ErrorText } from "../../../components/ErrorText";
import { InputField } from "../../../components/InputField";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../../types/WithAuthProps";
import { isServer } from "../../../utils/isServer";

interface ChatControllerProps extends WithAuthProps {
  chat: FullChatFragment | null | undefined;
}

export const ChatController: React.FC<ChatControllerProps> = ({
  loggedUser,
  chat,
}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const {
    data: messagesData,
    loading: messagesLoading,
    fetchMore: fetchMoreMessages,
    variables: messagesVariables,
    subscribeToMore: subscribeToMoreMessages,
  } = useMessagesQuery({
    fetchPolicy: "network-only",
    skip: typeof chat === "undefined" || !chat,
    variables: {
      chatId: chat?.id || "",
      limit: 15,
      skip: 0,
    },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages<
      NewMessageSubscription,
      NewMessageSubscriptionVariables
    >({
      document: NewMessageDocument,
      variables: {
        chatId: chat?.id || "",
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);

        if (!subscriptionData) return prev;
        return {
          messages: {
            ...prev.messages,
            messages: [
              ...prev.messages.messages,
              subscriptionData.data.newMessage,
            ],
          },
        } as any;
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messagesData?.messages.messages.length]);

  const [sendMessage] = useSendMessageMutation();
  const [markRead] = useMarkMessageReadMutation();

  const chatContainer = createRef<HTMLDivElement>();
  const scrollChatToBottom = () => {
    if (!chatContainer.current) return;
    chatContainer.current.scrollTo(
      0,
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight
    );
  };

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
            ref={chatContainer}
            className="flex flex-1 flex-col overflow-y-auto"
            style={{
              maxHeight: "calc(100vh - 48px - 65px)",
            }}
          >
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
                    });
                  }}
                >
                  {t("common.load_more")}
                </MyButton>
              </div>
            )}
            {messagesData?.messages.messages.map((message) => (
              <Waypoint
                key={`${chat.id}:${message.id}`}
                onEnter={async () => {
                  if (message.userId === loggedUser.id) return;
                  const { errors } = await markRead({
                    variables: {
                      chatId: chat.id,
                      messageId: message.id,
                    },
                  });
                }}
              >
                <div>
                  <ChatMessage me={loggedUser} message={message} />
                </div>
              </Waypoint>
            ))}
          </div>
          <div className="border-t p-3 bg-white">
            <Formik
              initialValues={{
                text: "",
              }}
              onSubmit={async (values, { setFieldValue }) => {
                await sendMessage({
                  variables: {
                    chatId: chat.id,
                    options: values,
                  },
                });

                setFieldValue("text", "");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-row items-center leading-normal space-x-2">
                  <InputField
                    name="text"
                    type="text"
                    placeholder="Message..."
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
