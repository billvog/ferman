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
import { UserOpenGraphPreview } from "../../components/UserOpenGraphPreview";

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
    <UserOpenGraphPreview user={userData?.user}>
      <Layout
        title={
          userData?.user ? `${userData.user.username} on Ferman` : "Ferman"
        }
        size="5xl"
      >
        <div>
          {userLoading || meLoading || (postsLoading && !postsData) ? (
            <MySpinner />
          ) : !userData?.user ? (
            <ErrorText>User could not be found</ErrorText>
          ) : !userData || !meData || !postsData ? (
            <ErrorText>Internal server error, please try again later</ErrorText>
          ) : (
            <div className="relative flex flex-col space-y-4 tablet:space-y-0 tablet:flex-row tablet:space-x-8">
              <div className="w-full tablet:w-96">
                <div className="tablet:sticky tablet:z-10 tablet:top-20">
                  <UserCard user={userData.user} me={meData.me || null} />
                </div>
              </div>
              <div className="w-full tablet:flex-1">
                <div className="text-tablet text-primary-600 mb-1">
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
                <div className="space-y-2">
                  {postsData.posts.posts.map((post) => (
                    <Post key={post.id} post={post} me={meData.me || null} />
                  ))}
                </div>
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
    </UserOpenGraphPreview>
  );
};

export default withMyApollo({
  ssr: true,
})(User);
