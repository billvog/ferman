import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { SettingsController } from "./SettingsController";

interface SettingsPageProps {}
const Page: React.FC<SettingsPageProps> = ({}) => {
  return (
    <WaitI18>
      <HeaderController title="Settings" />
      <WaitAuth RequireLoggedIn>
        {(user) => (
          <MainGrid
            title="Settings"
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <SettingsController loggedUser={user} />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};

export const SettingsPage = withMyApollo()(Page);
