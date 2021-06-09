import { FullMessageFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";

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
  const router = useRouter();
  const isMe = me.id === message.userId;

  return (
    <div
      className={`flex ${
        isMe ? "flex-row-reverse" : "flex-row"
      } justify-between w-full`}
    >
      <div
        className={`p-1.5 flex flex-col ${isMe ? "items-end" : "items-start"}`}
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
              className={`text-md text-primary-500 ${
                isMe
                  ? "border border-primary-100 bg-primary-50"
                  : "bg-primary-100"
              } px-3.5 py-2 rounded-3xl table table-fixed whitespace-pre-wrap break-word`}
            >
              {message.text}
            </div>
            {showRead && isMe && message.read && (
              <div className="mt-2 mx-2">
                <div className="text-xs text-primary-400">Read</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
