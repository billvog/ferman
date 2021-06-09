import { FullChatFragment, FullUserFragment } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useTrancatedText } from "../shared-hooks/useTruncatedText";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface ChatProps {
  me: FullUserFragment;
  chat: FullChatFragment;
  isOdd: boolean;
}

export const Chat: React.FC<ChatProps> = ({ chat, me, isOdd }) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const otherUser = me.id === chat.senderId ? chat.reciever : chat.sender;

  return (
    <div
      className={`flex items-center text-primary-500 p-3 group cursor-pointer ${
        isOdd ? "bg-white" : "bg-primary-50"
      }`}
      title={t("chat.chat_with").replace("%user1%", otherUser.username)}
      onClick={() => router.push(`/chat/${chat.id}`)}
    >
      <div className="mr-3">
        <div className="relative p-0.5">
          <img
            className="w-9 h-9 rounded-35"
            src={otherUser.profile?.avatarUrl}
          />
          {otherUser.isOnline && (
            <div className="absolute bottom-0 right-0">
              <div className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-primary-50" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex items-center">
          <div className="text-md text-primary-600 font-bold group-hover:underline">
            {otherUser.username}
          </div>
          {chat.hasUnreadMessage && (
            <div
              title="You have an unread message"
              className="ml-2 w-1.5 h-1.5 rounded-full bg-blue-500"
              style={{
                transform: "translateY(0.7px)",
              }}
            />
          )}
        </div>
        {chat.latestMessage && chat.latestMessage.text.length < 50 ? (
          <div className="text-xs flex justify-between">
            <span className="table table-fixed whitespace-pre-wrap break-word">
              {chat.latestMessage.userId === me.id && (
                <b>{t("common.you")}: </b>
              )}
              <span
                className={
                  chat.latestMessage.userId !== me.id &&
                  !chat.latestMessage.read
                    ? "font-semibold"
                    : ""
                }
              >
                {chat.latestMessage?.text}
              </span>
            </span>
            <span className="min-w-max pl-3">
              {dayjs(chat.latestMessage?.createdAt).fromNow()}
            </span>
          </div>
        ) : (
          <div className="text-xs">
            {otherUser.isOnline
              ? t("user.active_now")
              : t("user.last_seen").replace(
                  "%time%",
                  dayjs(parseFloat(otherUser.lastSeen)).fromNow(true)
                )}
          </div>
        )}
      </div>
    </div>
  );
};
