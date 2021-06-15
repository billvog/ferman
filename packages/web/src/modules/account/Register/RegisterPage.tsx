import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { RegisterConnector } from "./RegisterConnector";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { withMyApollo } from "../../../utils/withMyApollo";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("register.title")} />
      <WaitAuth RequireNotLoggedIn>
        <MainGrid
          title={t("register.title")}
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <RegisterConnector />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const RegisterPage = withMyApollo({ ssr: false })(Page);
