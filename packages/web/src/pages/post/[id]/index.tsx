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
import Head from "next/head";

const ViewPost = ({}) => {
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
    <Layout
      title={
        userData && postData
          ? `${userData?.user?.username}: “${postData?.post?.body}” – Ferman`
          : "Post – Ferman"
      }
      size="lg"
    >
      <div>
        {(postLoading && !postData) || userLoading || meLoading ? (
          <MySpinner />
        ) : !postData?.post ? (
          <ErrorText>Post not found (404)</ErrorText>
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !postData || !userData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <div>
            <div>
              <Head>
                <meta name="author" content={userData.user.username} />
                <meta name="description" content={postData.post.body} />
                <meta
                  name="og:title"
                  content={`${userData.user.username} on Ferman`}
                />
                <meta
                  name="og:description"
                  content="Ferman, the modern saloon."
                />
                <meta name="og:type" content="article" />
                <meta
                  name="og:url"
                  // content={`https://ferman.ga/post/${postData.post.id}`}
                  content={`https://www.gravatar.com/avatar/${userData.user.md5}`}
                />
                <meta name="og:sitename" content="Ferman" />
                <meta name="og:image" content="https://ferman.ga/favicon.ico" />
              </Head>
              <Post
                key={postData.post.id}
                post={postData.post}
                me={meData?.me || null}
                onDelete={() => router.back()}
              />
            </div>
            <div className="flex mt-6 justify-between items-center">
              <div className="text-md text-gray-600">
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
                <div className="text-sm text-gray-500">
                  There no comments...
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  {commentsData.comments?.map((comment) => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      me={meData?.me || null}
                      clickable
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default withMyApollo({
  ssr: true,
})(ViewPost);
