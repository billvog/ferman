import React from "react";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
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
          <MainLayout
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("edit_profile.title")}
          >
            <EditProfileConnector />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
