import { useRouter } from "next/router";
import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { MyCenterSpinner } from "../../../components/MyCenterSpinner";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { HeaderController } from "../../display/HeaderController";
import { CreatePostConnector } from "./CreatePostConnector";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const screenType = useScreenType();

  if (screenType !== "fullscreen") {
    router.replace("/", "/post", { shallow: true });
  }

  return (
    <WaitI18>
      <HeaderController title={t("post.post")} />
      <WaitAuth RequireLoggedIn>
        {(user) =>
          screenType === "fullscreen" ? (
            <MainGrid
              title={t("post.title")}
              loggedUser={user}
              bottomNav={<CommonBottomNav loggedUser={user} />}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <div className="px-3">
                <CreatePostConnector />
              </div>
            </MainGrid>
          ) : (
            <MyCenterSpinner />
          )
        }
      </WaitAuth>
    </WaitI18>
  );
};

export const CreatePostPage = withMyApollo()(Page);
