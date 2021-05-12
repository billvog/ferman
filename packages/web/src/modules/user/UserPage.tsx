import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { MySpinner } from "../../components/MySpinner";
import { MyButton } from "../../components/MyButton";
import { UserOpenGraphPreview } from "./UserOpenGraphPreview";

export const UserPage: React.FC = () => {
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
        pageTitle={userData?.user ? userData.user.username : ""}
      >
        <div>
          {userLoading || meLoading || (postsLoading && !postsData) ? (
            <MySpinner />
          ) : !userData?.user ? (
            <ErrorText>User could not be found</ErrorText>
          ) : !userData || !meData || !postsData ? (
            <ErrorText>Internal server error, please try again later</ErrorText>
          ) : (
            <div className="relative flex flex-col space-y-4">
              <div className="w-full">
                <div>
                  <UserCard user={userData.user} me={meData.me || null} />
                </div>
              </div>
              <div className="w-full">
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
