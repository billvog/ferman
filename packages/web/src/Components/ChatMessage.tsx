import {
  FullMessageFragment,
  FullUserFragment,
  useDeleteMessageMutation,
  useMarkMessageReadMutation,
} from "@ferman-pkgs/controller";
import { Menu, Transition } from "@headlessui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";
import { Waypoint } from "react-waypoint";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface ChatMessageProps {
  me: FullUserFragment;
  message: FullMessageFragment;
  showRead: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  me,
  message,
  showRead = false,
}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const isMe = me.id === message.userId;

  const [markRead] = useMarkMessageReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  return (
    <Waypoint
      onEnter={async () => {
        if (message.userId === me.id || message.read) return;
        markRead({
          variables: {
            chatId: message.chatId,
            messageId: message.id,
          },
        });
      }}
    >
      <div
        className={`flex ${
          isMe ? "flex-row-reverse" : "flex-row"
        } justify-between w-full`}
      >
        <div
          className={`p-1.5 flex flex-col ${
            isMe ? "items-end" : "items-start"
          }`}
        >
          <div className="flex items-end">
            {!isMe && (
              <div className="mr-3 min-w-max">
                <img
                  src={message.user.profile?.avatarUrl}
                  className="w-7 h-7 rounded-35 cursor-pointer"
                  onClick={() => router.push(`/user/${message.user.uid}`)}
                />
              </div>
            )}
            <div className="group flex flex-col justify-center">
              <div className="flex items-center">
                {isMe && (
                  <div
                    className="opacity-0 group-hover:opacity-100 mr-2.5"
                    title={t("button.delete")}
                    onClick={() =>
                      deleteMessage({
                        variables: {
                          chatId: message.chatId,
                          messageId: message.id,
                        },
                      })
                    }
                  >
                    <div className="cursor-pointer text-primary-400 hover:text-accent-washed-out">
                      <HiTrash size="14px" />
                    </div>
                  </div>
                )}
                <div
                  className={`text-md text-primary-500 bg-primary-100 ${
                    isMe ? "rounded-br-none" : "rounded-bl-none"
                  } px-4 py-2.5 rounded-3xl table table-fixed whitespace-pre-wrap break-word`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-1 ${isMe ? "" : "ml-10"}`}>
            <div className="text-xs text-primary-400">
              {dayjs(message.createdAt).fromNow()}
              {showRead &&
                isMe &&
                message.read &&
                ", " + t("chat.message_read")}
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
