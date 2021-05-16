import { useMeQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { PostComment } from "../../../components/PostComment";
import { useGetCommentFromUrl } from "../../../shared-hooks/useGetCommentFromUrl";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { CreateCommentModal } from "./create/CreateCommentModal";

interface CommentControllerProps {}
export const CommentController: React.FC<CommentControllerProps> = ({}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const {
    data: commentData,
    loading: commentLoading,
    fetchMore: fetchMoreComments,
    variables: commentVariables,
  } = useGetCommentFromUrl();

  const [showCreateComment, setShowCreateComment] = useState(false);

  useEffect(() => setShowCreateComment(false), []);

  return (
    <div>
      {(!commentData && commentLoading) || meLoading ? (
        <MySpinner />
      ) : !commentData?.comment.parent ? (
        <ErrorText>{t("comment.not_found")}</ErrorText>
      ) : !commentData || !meData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="relative flex flex-col space-y-4">
          <div className="w-full">
            <div>
              <PostComment
                comment={commentData.comment.parent}
                me={meData.me || null}
                onDelete={router.back}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex mt-5 justify-between items-center">
              <div className="text-lg text-primary-600">
                <b>{t("comment.replies")}</b>{" "}
                {!!commentData?.comment?.count &&
                  `(${commentData?.comment?.count})`}
              </div>
              {meData?.me && (
                <MyButton onClick={() => setShowCreateComment(true)}>
                  {t("comment.reply")}
                </MyButton>
              )}
            </div>
            <div>
              {commentData.comment?.count === 0 ? (
                <div className="text-sm text-primary-450">
                  {t("comment.there_are_no_replies")}
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  {commentData.comment.comments?.map((comment) => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      me={meData?.me || null}
                    />
                  ))}
                </div>
              )}
              {commentData?.comment.comments && commentData.comment.hasMore && (
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
      <CreateCommentModal
        isOpen={showCreateComment}
        onClose={() => setShowCreateComment(false)}
      />
    </div>
  );
};
