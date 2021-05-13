import React from "react";
import { NextPage } from "next";
import { withMyApollo } from "../utils/withMyApollo";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { AuthManager } from "../components/AuthManager";
import { HeaderController } from "../modules/display/HeaderController";
import { CommonSidebar } from "../components/CommonSidebar";
import { MainLayout } from "../components/MainLayout";
import { SearchPage } from "../modules/search/SearchPage";
import { WaitI18 } from "../components/WaitI18";

const Search: NextPage = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("search.title")} />
      <AuthManager>
        {(user) => (
          <MainLayout
            title={t("search.title")}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <SearchPage />
          </MainLayout>
        )}
      </AuthManager>
    </WaitI18>
  );
};

export default withMyApollo({
  ssr: false,
})(Search);
