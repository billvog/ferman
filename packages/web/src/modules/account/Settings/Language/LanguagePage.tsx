import React from "react";
import { CommonBottomNav } from "../../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../../components/CommonSidebar";
import { MainGrid } from "../../../../components/MainGrid";
import { WaitAuth } from "../../../../components/WaitAuth";
import { WaitI18 } from "../../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../../utils/withMyApollo";
import { HeaderController } from "../../../display/HeaderController";
import { LanguageController } from "./LanguageController";

interface LanguagePageProps {}
const Page: React.FC<LanguagePageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("settings.language.title")} />
      <WaitAuth RequireLoggedIn>
        {(user) => (
          <MainGrid
            title={t("settings.language.title")}
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
