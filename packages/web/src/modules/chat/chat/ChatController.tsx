import {
  FullChatFragment,
  MessagesDocument,
  MessagesQuery,
  MessagesQueryResult,
  MessagesQueryVariables,
  NewMessageDocument,
  NewMessageSubscriptionResult,
  NewMessageSubscriptionVariables,
  useMessagesQuery,
  useNewMessageSubscription,
  useSendMessageMutation,
} from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React from "react";
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

  const {
    data: messagesData,
    loading: messagesLoading,
    fetchMore: fetchMoreMessages,
    variables: messagesVariables,
  } = useMessagesQuery({
    fetchPolicy: "network-only",
    skip: typeof chat === "undefined" || !chat,
    variables: {
      chatId: chat?.id || "",
      limit: 15,
    },
  });

  const {} = useNewMessageSubscription({
    onSubscriptionData: (options) => {
      const data = options.client.readQuery<
        MessagesQuery,
        MessagesQueryVariables
      >({
        query: MessagesDocument,
        variables: messagesVariables,
      });

      options.client.writeQuery<MessagesQuery, MessagesQueryVariables>({
        query: MessagesDocument,
        data: {
          __typename: "Query",
          ...data,
          messages: {
            ...data!.messages,
            messages: [options.subscriptionData.data?.newMessage as any],
          },
        },
        variables: messagesVariables,
      });
    },
    fetchPolicy: "network-only",
    skip: typeof chat === "undefined" || !chat,
    variables: {
      chatId: chat?.id || "",
    },
  });

  const [sendMessage, { loading: sendLoading }] = useSendMessageMutation();

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
        <div className="w-full h-full flex flex-col justify-between">
          <div>
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
                  className={`p-3 flex items-center ${
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
                      className="w-6 h-6 rounded-35"
                    />
                  </div>
                  <div className="relative">
                    <div className="text-md text-primary-500 bg-primary-100 px-3.5 py-2 rounded-2xl">
                      {message.text}
                    </div>
                    <div
                      className={`absolute mt-1 ${
                        message.userId === loggedUser.id ? "right-1" : "left-1"
                      } text-xs text-primary-400`}
                    >
                      {dayjs(message.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t w-full p-3">
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
                  update(cache, result) {
                    cache.modify({
                      fields: {
                        messages(existing = []) {
                          return [...existing, result];
                        },
                      },
                    });
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
