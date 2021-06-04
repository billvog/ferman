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
      className={`flex items-start text-primary-500 p-3 group cursor-pointer ${
        isOdd ? "bg-white" : "bg-primary-50"
      }`}
      title={t("chat.chat_with").replace("%user1%", otherUser.username)}
      onClick={() => router.push(`/chat/${chat.id}`)}
    >
      <div className="mr-3">
        <div className="relative p-0.5">
          <img
            className="w-8 h-8 rounded-35"
            src={otherUser.profile?.avatarUrl}
          />
          {chat.hasUnreadMessage && (
            <div className="absolute bottom-0 right-0">
              <div className="w-2 h-2 rounded-full bg-secondary-500 ring-2 ring-primary-50" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col leading-none flex-1">
        <div className="text-sm text-primary-600 font-bold group-hover:underline">
          {otherUser.username}
        </div>
        {chat.latestMessage && (
          <div className="text-xs flex justify-between">
            <span className="table table-fixed whitespace-pre-wrap break-word">
              {chat.latestMessage.userId === me.id && (
                <b>{t("common.you")}: </b>
              )}
              <span>{useTrancatedText(chat.latestMessage?.text, 50)}</span>
            </span>
            <span className="min-w-max pl-3">
              {dayjs(chat.latestMessage?.createdAt).fromNow()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
