import React from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useGetCommentFromUrl } from "../../../shared-hooks/useGetCommentFromUrl";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { CommentController } from "./CommentController";
import { CommentOpenGraphPreview } from "./CommentOpenGraphPreview";

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
              <MainGrid
                title={t("comment.header_title")}
                loggedUser={user}
                bottomNav={<CommonBottomNav loggedUser={user} />}
                leftSidebar={<CommonSidebar loggedUser={user} />}
              >
                <CommentController user={user} />
              </MainGrid>
            </>
          )}
        </WaitAuth>
      </WaitI18>
    </CommentOpenGraphPreview>
  );
};
