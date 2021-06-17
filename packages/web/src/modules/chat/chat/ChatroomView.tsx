import {
  FullChatFragment,
  PaginatedMessages,
  SendMessageFormValues,
} from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { RiWechatFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { ChatMessageMax } from "../../../../../common/dist";
import { ChatMessage } from "../../../components/ChatMessage";
import { ErrorText } from "../../../components/ErrorText";
import { InputField } from "../../../components/InputField";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../../auth/AuthProvider";

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
  const screenType = useScreenType();

  const { me } = useContext(AuthContext);

  const [latestRead, setLatestRead] = useState(-1);
  useEffect(() => {
    if (!messages?.messages) return;
    const lm = messages.messages[0];
    if (lm.userId === me?.id && lm.read) setLatestRead(lm.id);
  }, [messages?.messages]);

  return (
    <>
      {!me || typeof chat === "undefined" || (isLoading && !messages) ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !chat || !messages ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
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
            {messages.count === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="mb-2 text-accent">
                  <RiWechatFill size="96px" />
                </div>
                <div className="text-primary-400">{t("chat.no_messages")}</div>
              </div>
            ) : (
              <>
                {messages.messages.map((message, index) => {
                  const nextMessage =
                    messages.messages[index > 0 ? index - 1 : index];

                  const isFirst = index === messages.messages.length - 1;

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
                        me={me}
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
                {messages.hasMore && (
                  <div className="mx-auto p-4">
                    <MyButton isLoading={isLoading} onClick={loadMoreMessages}>
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
                const error = await sendMessage(values);
                if (error) {
                  return toast.error(t(error as any));
                } else setFieldValue("text", "");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-row items-center leading-normal space-x-2">
                  <InputField
                    name="text"
                    type="text"
                    placeholder={t("form.placeholder.message")}
                    maxLength={ChatMessageMax}
                    disabled={isSubmitting}
                  />
                  <MyButton isLoading={isSubmitting} type="submit">
                    {t("button.send")}
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
