import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { PostComment } from "../../../components/PostComment";
import { useGetCommentFromUrl } from "../../../shared-hooks/useGetCommentFromUrl";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../../types/PageWithAuthProps";
import { CreateCommentModal } from "./create/CreateCommentModal";

interface CommentControllerProps extends PageWithAuthProps {}

export const CommentController: React.FC<CommentControllerProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const {
    data: commentData,
    loading: commentLoading,
    fetchMore: fetchMoreComments,
    variables: commentVariables,
  } = useGetCommentFromUrl();

  return (
    <div>
      {(!commentData && commentLoading) || typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !commentData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : !commentData.comment.parent ? (
        <ErrorText>{t("comment.not_found")}</ErrorText>
      ) : (
        <div className="relative flex flex-col">
          <div className="w-full border-b">
            <div>
              <PostComment
                comment={commentData.comment.parent}
                me={loggedUser}
                onDelete={router.back}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex p-3 pb-0 justify-between items-center">
              <div className="text-lg text-primary-600">
                <b>{t("comment.replies")}</b>{" "}
                {commentData.comment.count > 1 &&
                  `(${commentData.comment.count})`}
              </div>
              {loggedUser && (
                <MyButton
                  onClick={() =>
                    router.push(
                      {
                        pathname: router.pathname,
                        query: router.query,
                      },
                      `/post/${router.query.postId}/comment/${router.query.commentId}/reply`
                    )
                  }
                >
                  {t("comment.reply")}
                </MyButton>
              )}
            </div>
            <div>
              {commentData.comment.count === 0 ? (
                <div className="text-sm text-primary-450 px-3">
                  {t("comment.there_are_no_replies")}
                </div>
              ) : (
                <div className="divide-y border-t border-b mt-3">
                  {commentData.comment.comments?.map((comment) => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      me={loggedUser}
                    />
                  ))}
                </div>
              )}
              {commentData.comment.comments && commentData.comment.hasMore && (
                <div className="flex justify-center mt-5">
                  <MyButton
                    isLoading={commentLoading}
                    onClick={() => {
                      fetchMoreComments!({
                        variables: {
                          ...commentVariables,
                          skip: commentData.comment.comments.length,
                        },
                      });
                    }}
                  >
                    {t("common.load_more")}
                  </MyButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
