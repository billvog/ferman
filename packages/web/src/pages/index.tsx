import React from "react";
import { Layout } from "../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import NextLink from "next/link";
import { withMyApollo } from "../utils/withMyApollo";
import { Post } from "../components/Post";
import { ErrorText } from "../components/ErrorText";
import { SearchIcon } from "@chakra-ui/icons";
import { MyButton } from "../components/MyButton";
import { MyIconButton } from "../components/MyIconButton";
import { MySpinner } from "../components/MySpinner";
import styled from "styled-components";

const Index = () => {
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
      query: null,
    },
  });

  return (
    <Layout size="lg" title="Feed – Ferman">
      <Header>
        <h1 color="mainDarkBlue">Feed</h1>
        <div>
          <NextLink href="/search">
            <MyIconButton icon={<SearchIcon />} />
          </NextLink>
          {meData?.me && (
            <NextLink href="/post">
              <MyButton
                style={{
                  marginLeft: 8,
                  backgroundColor: "saddlebrown",
                }}
              >
                post now
              </MyButton>
            </NextLink>
          )}
        </div>
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
        <PostsContainer>
          {postsData.posts.posts.map((post) => (
            <Post key={post.id} post={post} me={meData?.me || null} />
          ))}
        </PostsContainer>
      )}
      {postsData?.posts.posts && postsData?.posts?.hasMore && (
        <LoadMoreContainer>
          <MyButton
            colorScheme="grey"
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

export default withMyApollo({ ssr: true })(Index);

// Styles
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
