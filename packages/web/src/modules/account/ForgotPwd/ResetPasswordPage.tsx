import React from "react";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ResetPasswordConnector } from "./ResetPasswordConnector";

interface ResetPasswordPageProps {}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("reset_pwd.title")} />
      <WaitAuth RequireNotLoggedIn>
        {(user) => (
          <MainLayout
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("reset_pwd.title")}
          >
            <ResetPasswordConnector />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
