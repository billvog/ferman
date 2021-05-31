import { useChatsQuery } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../types/WithAuthProps";
import { CreateChatModal } from "./create/CreateChatModal";

interface ChatControllerProps extends WithAuthProps {}
export const ChatController: React.FC<ChatControllerProps> = ({
  loggedUser,
}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const {
    data: chatsData,
    loading: chatsLoading,
    fetchMore: fetchMoreChats,
    variables: chatsVariables,
  } = useChatsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: 0,
    },
  });

  return (
    <div>
      {typeof loggedUser === "undefined" || (chatsLoading && !chatsData) ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !loggedUser ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div>
          <div className="p-3 flex items-center justify-between">
            <div className="text-lg font-semibold text-primary-500">
              {t("chat.chats")}{" "}
              {(chatsData?.chats.count || 0) > 1 &&
                `(${chatsData?.chats.count})`}
            </div>
            <MyButton onClick={() => router.push("/chat/new")}>
              {t("chat.new_chat")}
            </MyButton>
          </div>
          <div className="divide-y border-t border-b">
            {chatsData?.chats.count === 0 ? (
              <div>{t("chat.you_have_no_chats")}</div>
            ) : (
              chatsData?.chats.chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center text-primary-500 p-4 bg-primary-50 group cursor-pointer"
                  title={t("chat.chat_between").replace(
                    "%user1%",
                    chat.senderId !== loggedUser.id
                      ? chat.sender.username
                      : chat.recieverId !== loggedUser.id
                      ? chat.reciever.username
                      : ""
                  )}
                >
                  <div className="mr-3">
                    <img
                      className="w-8 h-8 rounded-35"
                      src={chat.reciever.profile?.avatarUrl}
                    />
                  </div>
                  <div className="flex flex-col leading-none flex-1">
                    <div className="text-sm font-bold group-hover:underline">
                      {chat.reciever.username}
                    </div>
                    <div className="text-vs flex justify-between">
                      <span>{chat.latestMessage?.text}</span>
                      <span>
                        {dayjs(chat.latestMessage?.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {chatsData?.chats.chats && chatsData?.chats.hasMore && (
            <div className="flex justify-center mt-5">
              <MyButton
                isLoading={chatsLoading}
                onClick={() => {
                  fetchMoreChats({
                    variables: {
                      ...chatsVariables,
                      skip: chatsData.chats.chats.length,
                    },
                  });
                }}
              >
                {t("common.load_more")}
              </MyButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
