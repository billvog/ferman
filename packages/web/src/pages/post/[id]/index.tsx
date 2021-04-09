import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../../components/Layout";
import {
  useCommentsQuery,
  useMeQuery,
  useUserQuery,
} from "@ferman-pkgs/controller";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { Post } from "../../../components/Post";
import { ErrorText } from "../../../components/ErrorText";
import { PostComment } from "../../../components/PostComment";
import styled from "styled-components";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";

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
    <Layout
      title={`${userData?.user?.username}: “${postData?.post?.body}” – Ferman`}
      description={postData?.post?.body}
      author={userData?.user?.username}
      size="lg"
    >
      <div>
        {(postLoading && !postData) || userLoading || meLoading ? (
          <MySpinner />
        ) : !postData?.post ? (
          <ErrorText>Post not found (404)</ErrorText>
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !postData || !userData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <div>
            <div>
              <Post
                key={postData.post.id}
                post={postData.post}
                me={meData?.me || null}
                onDelete={() => router.back()}
              />
            </div>
            <CreateCommentContainer>
              <CommentsCounterText>
                <b>Comments</b>{" "}
                {!!commentsData?.comments?.length &&
                  `(${commentsData?.comments?.length})`}
              </CommentsCounterText>
              {meData?.me && (
                <MyButton
                  style={{ backgroundColor: "saddlebrown" }}
                  onClick={() => {
                    router.push(`/post/${postData.post?.id}/comment`);
                  }}
                >
                  comment
                </MyButton>
              )}
            </CreateCommentContainer>
            <div>
              {commentsLoading && !commentsData ? (
                <MySpinner />
              ) : !commentsData ? (
                <ErrorText>Internal server error.</ErrorText>
              ) : commentsData.comments?.length === 0 ? (
                <NoCommentsText>There no comments...</NoCommentsText>
              ) : (
                <CommentsContainer>
                  {commentsData.comments?.map((comment) => (
                    <PostComment
                      key={comment.id}
                      comment={comment}
                      me={meData?.me || null}
                      clickable
                      marginBottom={12}
                    />
                  ))}
                </CommentsContainer>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default withMyApollo({
  ssr: true,
})(ViewPost);

const CommentsCounterText = styled.span`
  font-family: inherit;
  font-size: 11pt;
  color: dimgrey;
`;

const CreateCommentContainer = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
`;

const NoCommentsText = styled.div`
  font-size: 10pt;
  color: grey;
`;

const CommentsContainer = styled.div`
  margin-top: 12px;
`;
