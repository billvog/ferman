import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ExplorePostsController } from "./ExplorePostsController";
import { CommonBottomNav } from "../../../components/CommonBottomNav";

interface ExplorePostsPageProps {}
export const ExplorePostsPage: React.FC<ExplorePostsPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("explore.posts.title")} />
      <WaitAuth>
        {(user) => (
          <>
            <MainGrid
              title={t("explore.posts.title")}
              loggedUser={user}
              bottomNav={<CommonBottomNav loggedUser={user} />}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <ExplorePostsController />
            </MainGrid>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
