import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../utils/withMyApollo";
import { MySpinner } from "../../components/MySpinner";
import { MyButton } from "../../components/MyButton";

const User = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: userData, loading: userLoading } = useGetUserFromUrl();
  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: fetchMorePosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: !userData?.user?.id,
    variables: {
      limit: 15,
      skip: null,
      userId: userData?.user?.id,
    },
  });

  return (
    <Layout title={`${userData?.user?.username || "Post"} – Ferman`} size="lg">
      <div>
        {userLoading || meLoading || (postsLoading && !postsData) ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !meData || !postsData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <div className="divide-y-2">
            <div className="mt-3 pb-5">
              <UserCard user={userData.user} me={meData.me || null} />
            </div>
            <div>
              <div className="text-lg text-secondary mt-2 mb-1">
                {postsData.posts.posts.length > 0 ? (
                  <div>
                    <b>{userData.user.username}'s</b> posts
                  </div>
                ) : (
                  <div>
                    <b>{userData.user.username}</b> has no posts
                  </div>
                )}
              </div>
              {postsData.posts.posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  me={meData.me || null}
                  clickable
                />
              ))}
            </div>
          </div>
        )}
        {postsData?.posts.posts && postsData?.posts?.hasMore && (
          <div className="flex justify-center mt-5">
            <MyButton
              isLoading={postsLoading}
              onClick={() => {
                fetchMorePosts!({
                  variables: {
                    ...postsVariables,
                    skip: postsData.posts.posts.length,
                  },
                });
              }}
            >
              load more
            </MyButton>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(User);
