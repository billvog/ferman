import { FullMessageFragment, FullUserFragment } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";

interface ChatMessageProps {
  me: FullUserFragment;
  message: FullMessageFragment;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ me, message }) => {
  const router = useRouter();
  const isMe = me.id === message.userId;

  return (
    <div
      className={`flex ${
        isMe ? "flex-row-reverse" : "flex-row"
      } justify-between w-full`}
    >
      <div
        className={`p-3 flex flex-col ${isMe ? "items-end" : "items-start"}`}
      >
        <div
          className={`flex items-start ${
            isMe ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div>
            {!isMe && (
              <div className="mr-3 min-w-max">
                <img
                  src={message.user.profile?.avatarUrl}
                  className="w-7 h-7 rounded-35 cursor-pointer"
                  onClick={() => router.push(`/user/${message.user.uid}`)}
                />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col ${
              isMe ? "items-end" : "items-start"
            } justify-center`}
          >
            <div
              className={`text-md ${
                isMe
                  ? "bg-primary-500 text-primary-50"
                  : "bg-primary-100 text-primary-500"
              } px-3 py-2 rounded-2xl table table-fixed whitespace-pre-wrap break-word`}
            >
              {message.text}
            </div>
            <div className="mt-1">
              <div className="text-xs text-primary-400 font-semibold">
                {dayjs(message.createdAt).fromNow()}
                {isMe && <span>, {message.read ? "read" : "unread"}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
