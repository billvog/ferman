import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ExploreUsersController } from "./ExploreUsersController";
import { CommonBottomNav } from "../../../components/CommonBottomNav";

interface ExploreUsersPageProps {}
export const ExploreUsersPage: React.FC<ExploreUsersPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("explore.users.title")} />
      <WaitAuth>
        {(user) => (
          <>
            <MainGrid
              title={t("explore.users.title")}
              loggedUser={user}
              leftSidebar={<CommonSidebar loggedUser={user} />}
              bottomNav={<CommonBottomNav loggedUser={user} />}
            >
              <ExploreUsersController />
            </MainGrid>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
