import React from "react";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { ForgotPasswordConnector } from "./ForgotPasswordConnector";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { withMyApollo } from "../../../utils/withMyApollo";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("forgot_pwd.title")} />
      <WaitAuth RequireNotLoggedIn>
        <MainGrid
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
          title={t("forgot_pwd.title")}
        >
          <ForgotPasswordConnector />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const ForgotPasswordPage = withMyApollo({ ssr: false })(Page);
