import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { EditProfileConnector } from "./EditProfileConnector";

interface EditProfilePageProps {}

export const EditProfilePage: React.FC<EditProfilePageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("edit_profile.title")} />
      <WaitAuth RequireLoggedIn>
        {(user) => (
          <MainGrid
            title={t("edit_profile.title")}
            loggedUser={user}
            leftSidebar={<CommonSidebar loggedUser={user} />}
            bottomNav={<CommonBottomNav loggedUser={user} />}
          >
            <EditProfileConnector />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
