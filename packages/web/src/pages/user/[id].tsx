import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useMeQuery, usePostsQuery } from "../../generated/graphql";
import { useGetUserFromUrl } from "../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../utils/withMyApollo";

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
    <Layout title={`${userData?.user?.username || "Post"} – Ferman`} size="xl">
      <Box>
        {userLoading || meLoading || (postsLoading && !postsData) ? (
          <Spinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !meData || !postsData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <Box>
            <Box mb={6}>
              <UserCard user={userData.user} me={meData.me || null} />
            </Box>
            <Divider mb={4} />
            <Box>
              <Heading
                fontSize={24}
                color="mainDarkBlue"
                fontWeight="normal"
                mb={4}
              >
                {postsData.posts.posts.length > 0 ? (
                  <Text>
                    <chakra.span fontWeight="bold">
                      {userData.user.username}'s
                    </chakra.span>{" "}
                    posts
                  </Text>
                ) : (
                  <Text>
                    <chakra.span fontWeight="bold">
                      {userData.user.username}
                    </chakra.span>{" "}
                    has no posts
                  </Text>
                )}
              </Heading>
              {postsData.posts.posts.map((post) => (
                <Post key={post.id} post={post} me={meData.me || null} />
              ))}
            </Box>
          </Box>
        )}
        {postsData?.posts.posts && postsData?.posts?.hasMore && (
          <Flex justifyContent="center">
            <Button
              isLoading={postsLoading}
              onClick={() => {
                fetchMorePosts({
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
      </Box>
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(User);
