import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useGetChatFromUrl } from "../../../shared-hooks/useGetChatFromUrl";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { ChatController } from "./ChatController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  const { data: chatData, loading: chatLoading } = useGetChatFromUrl();

  return (
    <WaitI18>
      <WaitAuth RequireLoggedIn>
        {(user) => {
          return (
            <>
              <HeaderController
                title={
                  user && chatData?.chat.chat
                    ? t("chat.chat_between").replace(
                        "%user1%",
                        chatData.chat.chat.senderId !== user.id
                          ? chatData.chat.chat.sender.username
                          : chatData.chat.chat.recieverId !== user.id
                          ? chatData.chat.chat.reciever.username
                          : ""
                      )
                    : undefined
                }
              />
              <MainGrid
                title={t("chat.title")}
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
