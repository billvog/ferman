import { useChatsQuery } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { MySpinner } from "../../components/MySpinner";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../types/WithAuthProps";

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
    variables: chatsVarialbes,
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
        <div className="divide-y">
          {chatsData?.chats.count === 0 ? (
            <div>You have no chats...</div>
          ) : (
            chatsData?.chats.chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center text-primary-500 p-4 bg-primary-50 group cursor-pointer"
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
      )}
    </div>
  );
};
