import React from "react";
import { CommonBottomNav } from "../../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../../components/CommonSidebar";
import { MainGrid } from "../../../../components/MainGrid";
import { WaitAuth } from "../../../../components/WaitAuth";
import { WaitI18 } from "../../../../components/WaitI18";
import { withMyApollo } from "../../../../utils/withMyApollo";
import { HeaderController } from "../../../display/HeaderController";
import { LanguageController } from "./LanguageController";

interface LanguagePageProps {}
const Page: React.FC<LanguagePageProps> = ({}) => {
  return (
    <WaitI18>
      <HeaderController title="Choose Languages" />
      <WaitAuth>
        {(user) => (
          <MainGrid
            title="Choose Language"
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <LanguageController loggedUser={user} />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};

export const LanguagePage = withMyApollo()(Page);
