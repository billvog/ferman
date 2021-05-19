import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { PostComment } from "../../../components/PostComment";
import { useMeQuery, useCommentQuery } from "@ferman-pkgs/controller";
import { MySpinner } from "../../../components/MySpinner";
import { MyButton } from "../../../components/MyButton";
import { CommentOpenGraphPreview } from "./CommentOpenGraphPreview";
import { useGetCommentFromUrl } from "../../../shared-hooks/useGetCommentFromUrl";
import { WaitI18 } from "../../../components/WaitI18";
import { HeaderController } from "../../display/HeaderController";
import { CommentController } from "./CommentController";
import { WaitAuth } from "../../../components/WaitAuth";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainLayout } from "../../../components/MainLayout";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

export const CommentPage = ({}) => {
  const { t } = useTypeSafeTranslation();
  const { data: commentData } = useGetCommentFromUrl();

  return (
    <CommentOpenGraphPreview comment={commentData?.comment.parent}>
      <WaitI18>
        <HeaderController
          title={
            commentData?.comment.parent
              ? `${commentData.comment.parent?.user.username}: "${commentData?.comment.parent?.text}"`
              : "Ferman"
          }
        />
        <WaitAuth>
          {(user) => (
            <>
              <MainLayout
                title={t("comment.header_title")}
                leftSidebar={<CommonSidebar loggedUser={user} />}
              >
                <CommentController />
              </MainLayout>
            </>
          )}
        </WaitAuth>
      </WaitI18>
    </CommentOpenGraphPreview>
  );
};
