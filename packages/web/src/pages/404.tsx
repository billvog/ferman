import React from "react";
import { HeaderController } from "../modules/display/HeaderController";
import { MainLayout } from "../components/MainLayout";
import { WaitI18 } from "../components/WaitI18";
import { PageNotFound } from "../modules/errors/PageNotFound";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../utils/withMyApollo";

const NotFoundPage = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("404_page.title")} />
      <MainLayout>
        <PageNotFound />
      </MainLayout>
    </WaitI18>
  );
};

export default withMyApollo()(NotFoundPage);
