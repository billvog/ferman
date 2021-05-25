import { useCommentsQuery, useUserQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { PostComment } from "../../components/PostComment";
import { useGetPostFromUrl } from "../../shared-hooks/useGetPostFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";
import { CreateCommentModal } from "./comment/create/CreateCommentModal";

interface PostControllerProps extends PageWithAuthProps {}

export const PostController: React.FC<PostControllerProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

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

  return (
    <div>
      {(postLoading && !postData) ||
      userLoading ||
      typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !postData?.post ? (
        <ErrorText>{t("post.not_found")}</ErrorText>
      ) : !postData || !userData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="relative flex flex-col">
          <div className="w-full border-b">
            <div>
              <Post
                key={postData.post.id}
                post={postData.post}
                me={loggedUser}
                onDelete={() => router.back()}
              />
            </div>
          </div>
          <div className="w-full">
            {commentsLoading && !commentsData ? (
              <div className="p-6">
                <MySpinner />
              </div>
            ) : !commentsData ? (
              <ErrorText>{t("errors.500")}</ErrorText>
            ) : (
              <div>
                <div className="flex p-3 justify-between items-center">
                  <div className="text-lg text-primary-600">
                    <b>{t("comment.comments")}</b>{" "}
                    {!!postData.post.commentsCount &&
                      `(${postData.post.commentsCount})`}
                  </div>
                  {loggedUser && (
                    <MyButton
                      onClick={() =>
                        router.push(
                          {
                            pathname: router.pathname,
                            query: router.query,
                          },
                          `/post/${router.query.postId}/comment`
                        )
                      }
                    >
                      {t("post.comment")}
                    </MyButton>
                  )}
                </div>
                <div>
                  {postData.post.commentsCount === 0 ? (
                    <div className="text-sm text-primary-450 px-3">
                      {t("comment.there_are_no_comments")}
                    </div>
                  ) : (
                    <div className="divide-y border-t border-b">
                      {commentsData.comments.comments.map((comment) => (
                        <PostComment
                          key={comment.id}
                          comment={comment}
                          me={loggedUser}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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
    </div>
  );
};
