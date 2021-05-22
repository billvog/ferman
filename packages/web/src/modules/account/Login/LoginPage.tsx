import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { LoginConnector } from "./LoginConnector";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { withMyApollo } from "../../../utils/withMyApollo";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("login.title")} />
      <WaitAuth RequireNotLoggedIn>
        {(user) => (
          <MainGrid
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("login.title")}
          >
            <LoginConnector />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};

export const LoginPage = withMyApollo()(Page);
