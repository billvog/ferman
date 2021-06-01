import {
  FullChatFragment,
  NewMessageDocument,
  NewMessageSubscription,
  NewMessageSubscriptionVariables,
  useMessagesQuery,
  useSendMessageMutation,
} from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { createRef, useEffect } from "react";
import { ErrorText } from "../../../components/ErrorText";
import { InputField } from "../../../components/InputField";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
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
              <div
                key={`${chat?.id}:${message.id}`}
                className={`flex ${
                  message.userId === loggedUser.id
                    ? "flex-row-reverse"
                    : "flex-row"
                } justify-between w-full`}
              >
                <div
                  className={`p-3 flex flex-col ${
                    message.userId === loggedUser.id
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      message.userId === loggedUser.id
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div
                      className={`${
                        message.userId === loggedUser.id ? "ml-3" : "mr-3"
                      }`}
                    >
                      <img
                        src={message.user.profile?.avatarUrl}
                        className="w-7 h-7 rounded-35 cursor-pointer"
                        onClick={() => router.push(`/user/${message.user.uid}`)}
                      />
                    </div>
                    <div
                      className={`text-md text-primary-500 bg-primary-100 ${
                        message.userId === loggedUser.id
                          ? "bg-primary-100"
                          : "bg-primary-50"
                      } px-3 py-2 rounded-2xl`}
                    >
                      {message.text}
                    </div>
                  </div>
                  <div className="mt-1">
                    <div className="text-xs text-primary-400 font-semibold">
                      {dayjs(message.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              </div>
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
