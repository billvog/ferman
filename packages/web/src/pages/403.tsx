import React from "react";
import { HeaderController } from "../modules/display/HeaderController";
import { MainLayout } from "../components/MainLayout";
import { WaitI18 } from "../components/WaitI18";
import { AccessDenied } from "../modules/errors/AccessDenied";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../utils/withMyApollo";

const AccessDeniedPage = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("503_page.title")} />
      <MainLayout>
        <AccessDenied />
      </MainLayout>
    </WaitI18>
  );
};

export default withMyApollo()(AccessDeniedPage);
