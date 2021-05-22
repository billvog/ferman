import React from "react";
import { MainGrid } from "../../../components/MainGrid";
import { WaitI18 } from "../../../components/WaitI18";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { AccessDenied } from "./AccessDenied";

interface AccessDeniedPageProps {}

export const AccessDeniedPage: React.FC<AccessDeniedPageProps> = withMyApollo()(
  ({}) => {
    const { t } = useTypeSafeTranslation();
    return (
      <WaitI18>
        <HeaderController title={t("503_page.title")} />
        <MainGrid title={t("common.error")}>
          <AccessDenied />
        </MainGrid>
      </WaitI18>
    );
  }
);
