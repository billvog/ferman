import React, { useContext } from "react";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitAuth } from "../../components/WaitAuth";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../utils/withMyApollo";
import { AuthContext } from "../auth/AuthProvider";
import { HeaderController } from "../display/HeaderController";
import { FeedController } from "./FeedController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);

  return (
    <WaitI18>
      <HeaderController title={t("index.title")} />
      <WaitAuth>
        <MainGrid
          title={me ? t("index.feed") : t("index.recent_posts")}
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <FeedController />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const FeedPage = withMyApollo({ ssr: false })(Page);
