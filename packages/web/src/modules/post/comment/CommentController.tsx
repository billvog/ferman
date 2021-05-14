import { useMeQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { PostComment } from "../../../components/PostComment";
import { useGetCommentFromUrl } from "../../../shared-hooks/useGetCommentFromUrl";

interface CommentControllerProps {}

export const CommentController: React.FC<CommentControllerProps> = ({}) => {
  const router = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const {
    data: commentData,
    loading: commentLoading,
    fetchMore: fetchMoreComments,
    variables: commentVariables,
  } = useGetCommentFromUrl();

  return (
    <div>
      {(!commentData && commentLoading) || meLoading ? (
        <MySpinner />
      ) : !commentData?.comment.parent ? (
        <ErrorText>Comment could not be found</ErrorText>
      ) : !commentData || !meData ? (
        <ErrorText>Internal server error, please try again later</ErrorText>
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
                <b>Replies</b>{" "}
                {!!commentData?.comment?.count &&
                  `(${commentData?.comment?.count})`}
              </div>
              {meData?.me && (
                <MyButton
                  onClick={() => {
                    router.push(
                      `/post/${commentData.comment.parent?.postId}/comment?reply=${commentData.comment.parent?.id}`
                    );
                  }}
                >
                  reply
                </MyButton>
              )}
            </div>
            <div>
              {commentData.comment?.count === 0 ? (
                <div className="text-sm text-primary-450">
                  There no replies...
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
                    load more
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
