import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ForgotPasswordConnector } from "./ForgotPasswordConnector";

interface ForgotPasswordPageProps {}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("forgot_pwd.title")} />
      <WaitAuth RequireNotLoggedIn>
        {(user) => (
          <MainLayout
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("forgot_pwd.title")}
          >
            <ForgotPasswordConnector />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
