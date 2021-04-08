import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../utils/withMyApollo";
import { MySpinner } from "../../components/MySpinner";
import styled from "styled-components";
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
          <div>
            <UserCardContainer>
              <UserCard user={userData.user} me={meData.me || null} />
            </UserCardContainer>
            <Divider />
            <PostsContainer>
              <PostsCounterTitle>
                {postsData.posts.posts.length > 0 ? (
                  <div>
                    <b>{userData.user.username}'s</b> posts
                  </div>
                ) : (
                  <div>
                    <b>{userData.user.username}</b> has no posts
                  </div>
                )}
              </PostsCounterTitle>
              {postsData.posts.posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  me={meData.me || null}
                  clickable
                />
              ))}
            </PostsContainer>
          </div>
        )}
        {postsData?.posts.posts && postsData?.posts?.hasMore && (
          <LoadMoreContainer>
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
          </LoadMoreContainer>
        )}
      </div>
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(User);

// Styles
const UserCardContainer = styled.div`
  margin-bottom: 12px;
`;

const Divider = styled.div`
  border-top: 1px solid #f0f0f0;
  margin: 22px 5px 10px 5px;
`;

const PostsContainer = styled.div``;

const PostsCounterTitle = styled.h1`
  font-size: 16pt !important;
  font-weight: 400;
  margin-bottom: 8px !important;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
