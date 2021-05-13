import React from "react";
import { withMyApollo } from "../utils/withMyApollo";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { FeedPage } from "../modules/feed/FeedPage";
import { NextPage } from "next";
import { AuthManager } from "../components/AuthManager";
import { HeaderController } from "../modules/display/HeaderController";
import { MainLayout } from "../components/MainLayout";
import { CommonSidebar } from "../components/CommonSidebar";
import { WaitI18 } from "../components/WaitI18";

const Index: NextPage = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("index.title")} />
      <AuthManager>
        {(user) => (
          <>
            <MainLayout leftSidebar={<CommonSidebar loggedUser={user} />}>
              <FeedPage />
            </MainLayout>
          </>
        )}
      </AuthManager>
    </WaitI18>
  );
};

export default withMyApollo({ ssr: true })(Index);
