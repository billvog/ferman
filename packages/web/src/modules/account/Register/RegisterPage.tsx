import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { RegisterConnector } from "./RegisterConnector";

interface RegisterPageProps {}
export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("register.title")} />
      <WaitAuth RequireNotLoggedIn>
        {(user) => (
          <MainLayout
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("register.title")}
          >
            <RegisterConnector />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};