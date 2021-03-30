import {
  Flex,
  Button,
  Box,
  Spinner,
  chakra,
  UnorderedList,
  ListItem,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ErrorText } from "../components/ErrorText";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { SearchField } from "../components/SearchField";
import { useMeQuery, usePostsLazyQuery } from "@ferman/controller";
import { withMyApollo } from "../utils/withMyApollo";
import { useRouter } from "next/router";

const SearchTips = () => {
  return (
    <Box mt={2} color="grey">
      <chakra.span fontWeight="600">Search Tips</chakra.span> <br />
      <UnorderedList>
        <ListItem>Be careful of wrong syntax or misspelled words</ListItem>
        <ListItem>Be more precise</ListItem>
        <ListItem>Use keywords</ListItem>
      </UnorderedList>
    </Box>
  );
};

const SearchPost = () => {
  const router = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const [
    runPostsQuery,
    {
      loading: postsLoading,
      data: postsData,
      error: postsError,
      fetchMore: fetchMorePosts,
      variables: postsVariables,
      called: postsQueryCalled,
    },
  ] = usePostsLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      query: null,
    },
  });

  useEffect(() => {
    if (typeof router.query.query === "string") {
      runPostsQuery({
        variables: {
          ...postsVariables!,
          query: router.query.query,
          skip: null,
        },
      });
    }
  }, []);

  return (
    <Layout size="xl" title="Search – Ferman">
      <Box>
        <Heading color="mainDarkBlue" mb={2}>
          Search
        </Heading>
        <SearchField
          initialValue={(router.query.query as string) || ""}
          isLoading={postsLoading}
          onSubmit={(values) => {
            return runPostsQuery({
              variables: {
                ...postsVariables!,
                query: values.searchQuery,
                skip: null,
              },
            });
          }}
        />
      </Box>
      {(postsQueryCalled && ((postsLoading && !postsData) || !postsData)) ||
      meLoading ? (
        <Spinner />
      ) : postsError && !postsData && !postsQueryCalled ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : !postsData ? (
        <Box>
          <Text color="grey" fontSize={16}>
            Enter keywords, #hashtags or @mentions in the search filed to get
            some results.
          </Text>
          {SearchTips()}
        </Box>
      ) : postsData.posts.posts.length === 0 ? (
        <Box>
          <Text color="grey" fontSize={16}>
            We found nothing matching the given terms.
          </Text>
          {SearchTips()}
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

export default withMyApollo({
  ssr: true,
})(SearchPost);
