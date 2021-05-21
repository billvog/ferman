import React from "react";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitAuth } from "../../components/WaitAuth";
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
          <MainGrid
            title={t("search.title")}
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <SearchController />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
