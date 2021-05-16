import React from "react";
import { AuthManager } from "../../../components/AuthManager";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ExploreUsersController } from "./ExploreUsersController";

interface ExploreUsersPageProps {}
export const ExploreUsersPage: React.FC<ExploreUsersPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("explore.users.title")} />
      <AuthManager>
        {(user) => (
          <>
            <MainLayout
              title={t("explore.users.title")}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <ExploreUsersController />
            </MainLayout>
          </>
        )}
      </AuthManager>
    </WaitI18>
  );
};
