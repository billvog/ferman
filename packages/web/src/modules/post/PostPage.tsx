import { useUserQuery } from "@ferman-pkgs/controller";
import React from "react";
import { AuthManager } from "../../components/AuthManager";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainLayout } from "../../components/MainLayout";
import { WaitI18 } from "../../components/WaitI18";
import { useGetPostFromUrl } from "../../shared-hooks/useGetPostFromUrl";
import { HeaderController } from "../display/HeaderController";
import { PostOpenGraphPreview } from "./PostOpenGraphPreview";
import { PostController } from "./PostController";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const PostPage: React.FC = () => {
  const { t } = useTypeSafeTranslation();

  const { data: postData } = useGetPostFromUrl();
  const { data: userData } = useUserQuery({
    skip: !postData?.post?.creator.id,
    variables: {
      id: postData?.post?.creator.id || -1,
    },
  });

  return (
    <PostOpenGraphPreview post={postData?.post}>
      <WaitI18>
        <HeaderController
          title={
            userData?.user && postData?.post
              ? `${userData.user.username}: “${postData.post.body}” – Ferman`
              : "Ferman"
          }
        />
        <AuthManager>
          {(user) => (
            <>
              <MainLayout
                title={t("post.headerTitle")}
                leftSidebar={<CommonSidebar loggedUser={user} />}
              >
                <PostController />
              </MainLayout>
            </>
          )}
        </AuthManager>
      </WaitI18>
    </PostOpenGraphPreview>
  );
};
