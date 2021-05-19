import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { LoginConnector } from "./LoginConnector";

interface LoginPageProps {}
export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("login.title")} />
      <WaitAuth RequireNotLoggedIn>
        {(user) => (
          <MainLayout
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("login.title")}
          >
            <LoginConnector />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};