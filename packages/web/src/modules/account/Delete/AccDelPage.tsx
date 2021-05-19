import React from "react";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
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
          <MainLayout
            leftSidebar={<CommonSidebar loggedUser={user} />}
            title={t("delete_account.title")}
          >
            <AccDelConnector />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
