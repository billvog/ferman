import { Box, Link, Text } from "@chakra-ui/layout";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../../../components/ErrorText";
import { Layout } from "../../../../components/Layout";
import { PostComment } from "../../../../components/PostComment";
import { useMeQuery, useViewCommentQuery } from "@ferman/controller";
import { withMyApollo } from "../../../../utils/withMyApollo";

const ViewComment = ({}) => {
  const router = useRouter();
  const id =
    typeof router.query.commentId === "string"
      ? parseInt(router.query.commentId)
      : -1;

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: commentData, loading: commentLoading } = useViewCommentQuery({
    skip: id === -1,
    variables: {
      id,
    },
  });

  return (
    <Layout
      title={`${
        commentData?.viewComment.parent.user
          ? commentData.viewComment.parent.user.uid + "'s comment"
          : "Comment & Replies"
      } – Ferman`}
    >
      {commentLoading || meLoading ? (
        <Spinner />
      ) : !commentData || !meData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : (
        <>
          <Box>
            <PostComment
              comment={commentData.viewComment.parent}
              me={meData.me || null}
              onDelete={router.back}
            />
          </Box>
          <Flex mt={9} mb={2} justifyContent="space-between" align="center">
            <Text fontSize={16}>
              Replies{" "}
              {!!commentData?.viewComment?.replies &&
                `(${commentData?.viewComment?.replies.length})`}
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
                  router.push(
                    `/post/${commentData.viewComment.parent.postId}/comment?reply=${commentData.viewComment.parent.id}`
                  );
                }}
              >
                reply
              </Button>
            )}
          </Flex>
          <Box>
            <Stack>
              {commentData.viewComment?.replies.length === 0 ? (
                <Text fontSize={14} color="grey">
                  There no replies...
                </Text>
              ) : (
                commentData.viewComment.replies?.map((comment) => (
                  <PostComment
                    key={comment.id}
                    comment={comment}
                    me={meData?.me || null}
                  />
                ))
              )}
            </Stack>
          </Box>
        </>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(ViewComment);
