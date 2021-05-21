import React from "react";
import { HeaderController } from "../modules/display/HeaderController";
import { MainGrid } from "../components/MainGrid";
import { WaitI18 } from "../components/WaitI18";
import { PageNotFound } from "../modules/errors/PageNotFound";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../utils/withMyApollo";

const NotFoundPage = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <WaitI18>
      <HeaderController title={t("404_page.title")} />
      <MainGrid>
        <PageNotFound />
      </MainGrid>
    </WaitI18>
  );
};

export default withMyApollo()(NotFoundPage);
