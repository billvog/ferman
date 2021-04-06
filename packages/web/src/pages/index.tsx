import FeedStyles from "../css/feed.module.css";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
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
      <div className={FeedStyles.header}>
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
      </div>
      {(postsLoading && !postsData) || !postsData || meLoading ? (
        <MySpinner />
      ) : postsError && !postsData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <Box>
          <Text>There are no posts...</Text>
        </Box>
      ) : (
        postsData.posts.posts.map((post) => (
          <Post key={post.id} post={post} me={meData?.me || null} />
        ))
      )}
      {postsData?.posts.posts && postsData?.posts?.hasMore && (
        <Flex justifyContent="center">
          <Button
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
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withMyApollo({ ssr: true })(Index);
