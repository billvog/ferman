import React from "react";
import { WaitAuth } from "../../components/WaitAuth";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { AccountController } from "./AccountController";
import { CommonBottomNav } from "../../components/CommonBottomNav";

export const AccountPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("my_account.title")} />
      <WaitAuth RequireLoggedIn>
        {(user) => (
          <MainGrid
            title={t("my_account.title")}
            loggedUser={user}
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <AccountController loggedUser={user} />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
