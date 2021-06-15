import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { ResetPasswordConnector } from "./ResetPasswordConnector";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("reset_pwd.title")} />
      <WaitAuth RequireNotLoggedIn>
        <MainGrid
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
          title={t("reset_pwd.title")}
        >
          <ResetPasswordConnector />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const ResetPasswordPage = withMyApollo({ ssr: false })(Page);
