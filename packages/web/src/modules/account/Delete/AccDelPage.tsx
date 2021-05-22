import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { AccDelConnector } from "./AccDelConnector";

interface AccDelPageProps {}
export const AccDelPage: React.FC<AccDelPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("delete_account.title")} />
      <WaitAuth RequireLoggedIn>
        {(user) => (
          <MainGrid
            title={t("delete_account.title")}
            loggedUser={user}
            leftSidebar={<CommonSidebar loggedUser={user} />}
            bottomNav={<CommonBottomNav loggedUser={user} />}
          >
            <AccDelConnector />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
