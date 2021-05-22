import React from "react";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { PageNotFound } from "./PageNotFound";

export const PageNotFoundPage: React.FC = withMyApollo({ ssr: false })(({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("404_page.title")} />
      <MainGrid title={t("common.error")}>
        <PageNotFound />
      </MainGrid>
    </WaitI18>
  );
});
