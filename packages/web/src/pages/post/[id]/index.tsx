import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import {
  useCommentsQuery,
  useMeQuery,
  useUserQuery,
} from "@ferman-pkgs/controller";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { Post } from "../../../components/Post";
import { ErrorText } from "../../../components/ErrorText";
import { PostComment } from "../../../components/PostComment";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { PostOpenGraphPreview } from "../../../components/PostOpenGraphPreview";

const ViewPost = () => {
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
  const { data: commentsData, loading: commentsLoading } = useCommentsQuery({
    skip: !postData?.post?.id,
    variables: {
      postId: postData?.post?.id || "",
    },
  });

  return (
    <PostOpenGraphPreview post={postData?.post}>
      <Layout
        title={
          userData?.user && postData?.post
            ? `${userData?.user?.username}: “${postData?.post?.body}” – Ferman`
            : "Ferman"
        }
        size="4xl"
      >
        <div>
          {(postLoading && !postData) || userLoading || meLoading ? (
            <MySpinner />
          ) : !postData?.post ? (
            <ErrorText>Post could not be found</ErrorText>
          ) : !postData || !userData ? (
            <ErrorText>Internal server error, please try again later</ErrorText>
          ) : (
            <div className="relative flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-8">
              <div className="w-full tablet:w-96">
                <div className="tablet:sticky tablet:z-10 tablet:top-20">
                  <Post
                    key={postData.post.id}
                    post={postData.post}
                    me={meData?.me || null}
                    onDelete={() => router.back()}
                  />
                </div>
              </div>
              <div className="w-full tablet:flex-1">
                <div className="flex mt-6 tablet:mt-0 justify-between items-center">
                  <div className="text-base text-primary-600">
                    <b>Comments</b>{" "}
                    {!!commentsData?.comments?.length &&
                      `(${commentsData?.comments?.length})`}
                  </div>
                  {meData?.me && (
                    <MyButton
                      onClick={() => {
                        router.push(`/post/${postData.post?.id}/comment`);
                      }}
                    >
                      comment
                    </MyButton>
                  )}
                </div>
                <div>
                  {commentsLoading && !commentsData ? (
                    <MySpinner />
                  ) : !commentsData ? (
                    <ErrorText>Internal server error.</ErrorText>
                  ) : commentsData.comments?.length === 0 ? (
                    <div className="text-sm text-primary-450">
                      There no comments...
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {commentsData.comments?.map((comment) => (
                        <PostComment
                          key={comment.id}
                          comment={comment}
                          me={meData?.me || null}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </PostOpenGraphPreview>
  );
};

export default withMyApollo({
  ssr: true,
})(ViewPost);
