import React from "react";
import { AuthManager } from "../../components/AuthManager";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainLayout } from "../../components/MainLayout";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { AccountController } from "./AccountController";

export const AccountPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("my_account.title")} />
      <AuthManager RequireLoggedIn>
        {(loggedUser) => (
          <MainLayout leftSidebar={<CommonSidebar loggedUser={loggedUser} />}>
            <AccountController user={loggedUser} />
          </MainLayout>
        )}
      </AuthManager>
    </WaitI18>
  );
};
