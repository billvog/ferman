import React from "react";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitAuth } from "../../components/WaitAuth";
import { WaitI18 } from "../../components/WaitI18";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../utils/withMyApollo";
import { HeaderController } from "../display/HeaderController";
import { FeedController } from "./FeedController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("index.title")} />
      <WaitAuth>
        {(user) => (
          <>
            <MainGrid
              title={
                typeof user === "undefined"
                  ? ""
                  : user
                  ? t("index.feed")
                  : t("index.recent_posts")
              }
              loggedUser={user}
              bottomNav={<CommonBottomNav loggedUser={user} />}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <FeedController loggedUser={user} />
            </MainGrid>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};

export const FeedPage = withMyApollo({ ssr: false })(Page);
