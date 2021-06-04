import { useRouter } from "next/router";
import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { MySpinner } from "../../../components/MySpinner";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useGetChatFromUrl } from "../../../shared-hooks/useGetChatFromUrl";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { ChatController } from "./ChatController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const { data: chatData } = useGetChatFromUrl();

  return (
    <WaitI18>
      <WaitAuth RequireLoggedIn>
        {(user) => {
          const otherUser =
            chatData?.chat.chat && user
              ? chatData?.chat.chat?.senderId === user?.id
                ? chatData?.chat.chat?.reciever
                : chatData?.chat.chat?.sender
              : null;
          return (
            <>
              <HeaderController
                title={
                  user && chatData?.chat.chat
                    ? t("chat.chat_with").replace(
                        "%user1%",
                        otherUser?.username || ""
                      )
                    : undefined
                }
              />
              <MainGrid
                title={
                  <div>
                    {otherUser ? (
                      <div className="ml-2 flex flex-row items-center cursor-pointer group">
                        <div
                          className="mr-2.5"
                          onClick={() => router.push(`/user/${otherUser.uid}`)}
                        >
                          <img
                            src={otherUser.profile?.avatarUrl}
                            className="w-6 h-6 rounded-35"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="text-sm text-primary-500 font-semibold group-hover:underline">
                            {otherUser.uid}
                          </div>
                          <div className="text-xs leading-none">
                            Last seen 5 minutes ago
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-1 pl-2">
                        <MySpinner size="tiny" />
                      </div>
                    )}
                  </div>
                }
                loggedUser={user}
                bottomNav={<CommonBottomNav loggedUser={user} />}
                leftSidebar={<CommonSidebar loggedUser={user} />}
              >
                <ChatController chat={chatData?.chat.chat} loggedUser={user} />
              </MainGrid>
            </>
          );
        }}
      </WaitAuth>
    </WaitI18>
  );
};

export const ChatPage = withMyApollo({ ssr: false })(Page);
