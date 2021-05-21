import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { RegisterConnector } from "./RegisterConnector";
import { CommonBottomNav } from "../../../components/CommonBottomNav";

interface RegisterPageProps {}
export const RegisterPage: React.FC<RegisterPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("register.title")} />
      <WaitAuth RequireNotLoggedIn>
        {(user) => (
          <MainGrid
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("register.title")}
          >
            <RegisterConnector />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
