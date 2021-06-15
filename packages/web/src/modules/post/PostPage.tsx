import { useUserQuery } from "@ferman-pkgs/controller";
import React from "react";
import { WaitAuth } from "../../components/WaitAuth";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitI18 } from "../../components/WaitI18";
import { useGetPostFromUrl } from "../../shared-hooks/useGetPostFromUrl";
import { HeaderController } from "../display/HeaderController";
import { PostOpenGraphPreview } from "./PostOpenGraphPreview";
import { PostController } from "./PostController";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { withMyApollo } from "../../utils/withMyApollo";
import { useGetSinglePostFromUrl } from "../../shared-hooks/useGetSinglePostFromUrl";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const { data: postData } = useGetSinglePostFromUrl();

  return (
    <PostOpenGraphPreview post={postData?.post}>
      <WaitI18>
        <HeaderController
          title={
            postData?.post
              ? `${postData.post.creator.username}: “${postData.post.body}” – Ferman`
              : "Ferman"
          }
        />
        <WaitAuth>
          <MainGrid
            title={t("post.raw")}
            bottomNav={<CommonBottomNav />}
            leftSidebar={<CommonSidebar />}
          >
            <PostController />
          </MainGrid>
        </WaitAuth>
      </WaitI18>
    </PostOpenGraphPreview>
  );
};

export const PostPage = withMyApollo({
  ssr: true,
})(Page);
