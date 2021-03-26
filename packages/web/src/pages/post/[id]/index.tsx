import {
  Box,
  Spinner,
  IconButton,
  Stack,
  Button,
  Link,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import {
  useCommentsQuery,
  useMeQuery,
  useUserQuery,
} from "../../../generated/graphql";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { Post } from "../../../components/Post";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ErrorText } from "../../../components/ErrorText";
import { UserCard } from "../../../components/UserCard";
import { PostComment } from "../../../components/PostComment";

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
    <Layout title={`${postData?.post?.title || "Post"} – Ferman`} size="xl">
      <Box>
        {(postLoading && !postData) || userLoading || meLoading ? (
          <Spinner />
        ) : !postData?.post ? (
          <ErrorText>Post not found (404)</ErrorText>
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !postData || !userData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <Box>
            <Box mb={4}>
              <IconButton
                aria-label="go back"
                icon={<ArrowBackIcon />}
                onClick={() => router.back()}
              />
            </Box>
            <Box mb={4}>
              <UserCard
                me={meData?.me || null}
                user={userData.user}
                minimal={true}
              />
            </Box>
            <Box>
              <Post
                key={postData.post.id}
                post={postData.post}
                me={meData?.me || null}
                onDelete={() => router.back()}
              />
            </Box>
            <Flex mt={9} mb={2} justifyContent="space-between" align="center">
              <Text fontSize={16}>
                Comments{" "}
                {!!commentsData?.comments?.length &&
                  `(${commentsData?.comments?.length})`}
              </Text>
              {meData?.me && (
                <Button
                  as={Link}
                  colorScheme=""
                  bg="saddlebrown"
                  p={3}
                  height="30px"
                  fontSize={14}
                  onClick={() => {
                    router.push(`/post/${postData.post?.id}/comment`);
                  }}
                >
                  comment
                </Button>
              )}
            </Flex>
            <Box>
              <Stack>
                {commentsLoading && !commentsData ? (
                  <Spinner />
                ) : !commentsData ? (
                  <ErrorText>Cannot load comments.</ErrorText>
                ) : commentsData.comments?.length === 0 ? (
                  <Text fontSize={14} color="grey">
                    There no comments...
                  </Text>
                ) : (
                  commentsData.comments?.map((comment) => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      me={meData?.me || null}
                    />
                  ))
                )}
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};
export default withMyApollo({
  ssr: true,
})(ViewPost);
