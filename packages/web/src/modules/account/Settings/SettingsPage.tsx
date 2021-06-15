import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { SettingsController } from "./SettingsController";

interface SettingsPageProps {}
const Page: React.FC<SettingsPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("settings.title")} />
      <WaitAuth RequireLoggedIn>
        <MainGrid
          title={t("settings.title")}
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <SettingsController />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const SettingsPage = withMyApollo()(Page);
