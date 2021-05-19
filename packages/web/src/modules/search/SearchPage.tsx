import React from "react";
import { WaitAuth } from "../../components/WaitAuth";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainLayout } from "../../components/MainLayout";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { SearchController } from "./SearchController";

export const SearchPage = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("search.title")} />
      <WaitAuth>
        {(user) => (
          <MainLayout
            title={t("search.title")}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <SearchController />
          </MainLayout>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
