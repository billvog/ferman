import React from "react";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("chat.chat_between")} />
      <WaitAuth RequireLoggedIn>
        {(user) => (
          <>
            <MainGrid
              title={t("chat.title")}
              loggedUser={user}
              bottomNav={<CommonBottomNav loggedUser={user} />}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <ChatController loggedUser={user} />
            </MainGrid>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};

export const ChatPage = withMyApollo({ ssr: false })(Page);
