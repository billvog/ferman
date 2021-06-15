import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { AccDelConnector } from "./AccDelConnector";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("delete_account.title")} />
      <WaitAuth RequireLoggedIn>
        <MainGrid
          title={t("delete_account.title")}
          leftSidebar={<CommonSidebar />}
          bottomNav={<CommonBottomNav />}
        >
          <AccDelConnector />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const AccDelPage = withMyApollo({ ssr: false })(Page);
