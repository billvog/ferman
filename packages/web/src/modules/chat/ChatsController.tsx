import { useChatsQuery } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { Chat } from "../../components/Chat";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../types/WithAuthProps";

interface ChatsControllerProps extends WithAuthProps {}
export const ChatsController: React.FC<ChatsControllerProps> = ({
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
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
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
              chatsData?.chats.chats.map((chat, i) => (
                <Chat
                  key={chat.id}
                  chat={chat}
                  me={loggedUser}
                  isOdd={i % 2 === 1}
                />
              ))
            )}
          </div>
          {chatsData?.chats.hasMore && (
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
