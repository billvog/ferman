import React from "react";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainLayout } from "../../components/MainLayout";
import { WaitAuth } from "../../components/WaitAuth";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { FeedController } from "./FeedController";

export const FeedPage = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("index.title")} />
      <WaitAuth>
        {(user) => (
          <>
            <MainLayout leftSidebar={<CommonSidebar loggedUser={user} />}>
              <FeedController user={user} />
            </MainLayout>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
