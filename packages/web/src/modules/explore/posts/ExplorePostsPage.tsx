import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ExplorePostsController } from "./ExplorePostsController";

interface ExplorePostsPageProps {}
export const ExplorePostsPage: React.FC<ExplorePostsPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("explore.posts.title")} />
      <WaitAuth>
        {(user) => (
          <>
            <MainLayout
              title={t("explore.posts.title")}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <ExplorePostsController />
            </MainLayout>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
