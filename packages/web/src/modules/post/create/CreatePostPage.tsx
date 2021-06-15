import { useRouter } from "next/router";
import React, { useState } from "react";
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
    router.replace(
      {
        pathname: "/",
        query: router.query,
      },
      "/post",
      { shallow: true }
    );
  }

  const [title, setTitle] = useState(<div>{t("post.post")}</div>);
  const setModalTitle = (t: JSX.Element) => {
    setTitle(t);
  };

  return (
    <WaitI18>
      <HeaderController title={t("post.post")} />
      <WaitAuth RequireLoggedIn>
        {screenType === "fullscreen" ? (
          <MainGrid
            title={<div className="text-sm">{title}</div>}
            bottomNav={<CommonBottomNav />}
            leftSidebar={<CommonSidebar />}
          >
            <div className="px-3">
              <CreatePostConnector setModalTitle={setModalTitle} />
            </div>
          </MainGrid>
        ) : (
          <MyCenterSpinner />
        )}
      </WaitAuth>
    </WaitI18>
  );
};

export const CreatePostPage = withMyApollo()(Page);
