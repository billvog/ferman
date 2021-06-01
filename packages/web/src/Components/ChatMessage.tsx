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

  return (
    <div
      className={`flex ${
        message.userId === me.id ? "flex-row-reverse" : "flex-row"
      } justify-between w-full`}
    >
      <div
        className={`p-3 flex flex-col ${
          message.userId === me.id ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`flex items-center ${
            message.userId === me.id ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {message.userId !== me.id && (
            <div className="mr-3">
              <img
                src={message.user.profile?.avatarUrl}
                className="w-7 h-7 rounded-35 cursor-pointer"
                onClick={() => router.push(`/user/${message.user.uid}`)}
              />
            </div>
          )}
          <div
            className={`flex flex-col ${
              message.userId === me.id ? "items-end" : "items-start"
            } justify-center`}
          >
            <div
              className={`text-md text-primary-500 bg-primary-100 ${
                message.userId === me.id ? "bg-primary-100" : "bg-primary-50"
              } px-3 py-2 rounded-2xl`}
            >
              {message.text}
            </div>
            <div className="mt-1">
              <div className="text-2xs text-primary-400 font-semibold">
                {dayjs(message.createdAt).fromNow()}
                {message.userId === me.id && (
                  <span>, {message.read ? "read" : "unread"}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
