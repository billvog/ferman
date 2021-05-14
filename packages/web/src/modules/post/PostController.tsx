import {
  useMeQuery,
  useUserQuery,
  useCommentsQuery,
} from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MyDialog } from "../../components/MyDialog";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { PostComment } from "../../components/PostComment";
import { useGetPostFromUrl } from "../../shared-hooks/useGetPostFromUrl";
import { CreateCommentConnector } from "./comment/create/CreateCommentConnector";

interface PostControllerProps {}

export const PostController: React.FC<PostControllerProps> = ({}) => {
  const router = useRouter();

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
        <ErrorText>Post could not be found</ErrorText>
      ) : !postData || !userData ? (
        <ErrorText>Internal server error, please try again later</ErrorText>
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
                <b>Comments</b>{" "}
                {!!postData.post.commentsCount &&
                  `(${postData.post.commentsCount})`}
              </div>
              {meData?.me && (
                <MyButton onClick={() => setShowCreateComment(true)}>
                  comment
                </MyButton>
              )}
            </div>
            <div>
              {commentsLoading && !commentsData ? (
                <MySpinner />
              ) : !commentsData ? (
                <ErrorText>Internal server error.</ErrorText>
              ) : postData.post.commentsCount === 0 ? (
                <div className="text-sm text-primary-450">
                  There no comments...
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
                  load more
                </MyButton>
              </div>
            )}
          </div>
        </div>
      )}
      <MyDialog
        title="Comment"
        isOpen={showCreateComment}
        onClose={() => setShowCreateComment(false)}
      >
        <CreateCommentConnector onFinish={() => setShowCreateComment(false)} />
      </MyDialog>
    </div>
  );
};
