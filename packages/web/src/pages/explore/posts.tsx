import React from "react";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../utils/withMyApollo";
import { Post } from "../../components/Post";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import styled from "styled-components";

const ExplorePosts = () => {
  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const {
    loading: postsLoading,
    data: postsData,
    error: postsError,
    fetchMore: fetchMorePosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      feedMode: false,
    },
  });

  return (
    <Layout
      size="lg"
      title="Explore posts – Ferman"
      description="Explore the most recent posts on Ferman."
    >
      <Header>
        <h1 color="mainDarkBlue">Most recent posts</h1>
      </Header>
      {(postsLoading && !postsData) || !postsData || meLoading ? (
        <MySpinner />
      ) : postsError && !postsData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <NoPostsContainer>
          <div>There are no posts...</div>
        </NoPostsContainer>
      ) : (
        <div>
          <SearchInfoContainer>
            Found {postsData?.posts.count} result
            {postsData?.posts.count !== 1 ? "s" : ""} in{" "}
            {postsData?.posts.executionTime
              ? postsData?.posts.executionTime / 1000
              : 0}{" "}
            seconds
          </SearchInfoContainer>
          <PostsContainer>
            {postsData.posts.posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                me={meData?.me || null}
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
    </Layout>
  );
};

export default withMyApollo({ ssr: true })(ExplorePosts);

// Styles
const Header = styled.div`
  line-height: 1;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PostsContainer = styled.div`
  margin-top: 10px;
`;

const NoPostsContainer = styled.div`
  color: #b0b0b0;
  font-family: inherit;
`;

const SearchInfoContainer = styled.div`
  color: grey;
  font-size: 9pt;
  margin-bottom: 15px;
`;
