import React from "react";
import { WaitAuth } from "../../components/WaitAuth";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { AccountController } from "./AccountController";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { withMyApollo } from "../../utils/withMyApollo";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("my_account.title")} />
      <WaitAuth RequireLoggedIn>
        <MainGrid
          title={t("my_account.title")}
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <AccountController />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const AccountPage = withMyApollo({ ssr: false })(Page);
