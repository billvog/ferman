import React from "react";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitAuth } from "../../components/WaitAuth";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../utils/withMyApollo";
import { HeaderController } from "../display/HeaderController";
import { SearchController } from "./SearchController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("search.title")} />
      <WaitAuth>
        <MainGrid
          title={t("search.title")}
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <SearchController />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const SearchPage = withMyApollo({ ssr: false })(Page);
