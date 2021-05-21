import { useRouter } from "next/router";
import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useScreenType } from "../../../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { CreatePostConnector } from "./CreatePostConnector";

interface CreatePostPageProps {}
export const CreatePostPage: React.FC<CreatePostPageProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const screenType = useScreenType();
  if (screenType !== "fullscreen") {
    router.back();
  }

  return (
    <WaitI18>
      <HeaderController title={t("post.header_title")} />
      <WaitAuth>
        {(user) => (
          <MainGrid
            title={t("post.header_title")}
            bottomNav={<CommonBottomNav loggedUser={user} />}
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <CreatePostConnector />
          </MainGrid>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
