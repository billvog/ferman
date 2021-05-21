import React from "react";
import { HeaderController } from "../modules/display/HeaderController";
import { MainGrid } from "../components/MainGrid";
import { WaitI18 } from "../components/WaitI18";
import { AccessDenied } from "../modules/errors/AccessDenied";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../utils/withMyApollo";

const AccessDeniedPage = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("503_page.title")} />
      <MainGrid>
        <AccessDenied />
      </MainGrid>
    </WaitI18>
  );
};

export default withMyApollo()(AccessDeniedPage);
