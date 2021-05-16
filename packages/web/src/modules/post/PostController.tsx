import {
  useCommentsQuery,
  useMeQuery,
  useUserQuery,
} from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { PostComment } from "../../components/PostComment";
import { useGetPostFromUrl } from "../../shared-hooks/useGetPostFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { CreateCommentModal } from "./comment/create/CreateCommentModal";

interface PostControllerProps {}
export const PostController: React.FC<PostControllerProps> = ({}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: postData, loading: postLoading } = useGetPostFromUrl();
  const { data: userData, loading: userLoading } = useUserQuery({
    skip: !postData?.post?.creator.id,
    variables: {
      id: postData?.post?.creator.id || -1,
    },
  });
  const {
    data: commentsData,
    loading: commentsLoading,
    fetchMore: fetchMoreComments,
    variables: commentsVariables,
  } = useCommentsQuery({
    notifyOnNetworkStatusChange: true,
    skip: !postData?.post?.id,
    variables: {
      postId: postData?.post?.id || "",
      limit: 15,
      skip: 0,
    },
  });

  const [showCreateComment, setShowCreateComment] = useState(false);

  return (
    <div>
      {(postLoading && !postData) || userLoading || meLoading ? (
        <MySpinner />
      ) : !postData?.post ? (
        <ErrorText>{t("post.not_found")}</ErrorText>
      ) : !postData || !userData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="relative flex flex-col space-y-4">
          <div className="w-full">
            <div>
              <Post
                key={postData.post.id}
                post={postData.post}
                me={meData?.me || null}
                onDelete={() => router.back()}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex mt-5 justify-between items-center">
              <div className="text-lg text-primary-600">
                <b>{t("comment.comments")}</b>{" "}
                {!!postData.post.commentsCount &&
                  `(${postData.post.commentsCount})`}
              </div>
              {meData?.me && (
                <MyButton onClick={() => setShowCreateComment(true)}>
                  {t("post.comment")}
                </MyButton>
              )}
            </div>
            <div>
              {commentsLoading && !commentsData ? (
                <MySpinner />
              ) : !commentsData ? (
                <ErrorText>{t("errors.500")}</ErrorText>
              ) : postData.post.commentsCount === 0 ? (
                <div className="text-sm text-primary-450">
                  {t("comment.there_are_no_comments")}
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  {commentsData.comments.comments.map((comment) => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      me={meData?.me || null}
                    />
                  ))}
                </div>
              )}
            </div>
            {commentsData?.comments.comments && commentsData?.comments.hasMore && (
              <div className="flex justify-center mt-5">
                <MyButton
                  isLoading={commentsLoading}
                  onClick={() => {
                    fetchMoreComments!({
                      variables: {
                        ...commentsVariables,
                        skip: commentsData.comments.comments.length,
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
      )}
      <CreateCommentModal
        isOpen={showCreateComment}
        onClose={() => setShowCreateComment(false)}
      />
    </div>
  );
};
