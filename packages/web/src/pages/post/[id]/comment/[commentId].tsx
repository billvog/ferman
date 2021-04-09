import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../../../components/ErrorText";
import { Layout } from "../../../../components/Layout";
import { PostComment } from "../../../../components/PostComment";
import { useMeQuery, useViewCommentQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../../../utils/withMyApollo";
import { MySpinner } from "../../../../components/MySpinner";
import styled from "styled-components";
import { MyButton } from "../../../../components/MyButton";

const ViewComment = ({}) => {
  const router = useRouter();
  const id =
    typeof router.query.commentId === "string" ? router.query.commentId : "";

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: commentData, loading: commentLoading } = useViewCommentQuery({
    skip: typeof id !== "string",
    variables: {
      id,
    },
  });

  return (
    <Layout
      title={`${commentData?.viewComment.parent.user.username}: "${commentData?.viewComment.parent.text}" – Ferman`}
    >
      {commentLoading || meLoading ? (
        <MySpinner />
      ) : !commentData || !meData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : (
        <div>
          <div>
            <PostComment
              comment={commentData.viewComment.parent}
              me={meData.me || null}
              onDelete={router.back}
            />
          </div>
          <CreateReplyContainer>
            <RepliesCounterText>
              <b>Replies</b>{" "}
              {!!commentData?.viewComment?.replies &&
                `(${commentData?.viewComment?.replies.length})`}
            </RepliesCounterText>
            {meData?.me && (
              <MyButton
                style={{
                  backgroundColor: "saddlebrown",
                }}
                onClick={() => {
                  router.push(
                    `/post/${commentData.viewComment.parent.postId}/comment?reply=${commentData.viewComment.parent.id}`
                  );
                }}
              >
                reply
              </MyButton>
            )}
          </CreateReplyContainer>
          <div>
            {commentData.viewComment?.replies.length === 0 ? (
              <NoCommentsText>There no replies...</NoCommentsText>
            ) : (
              <RepliesContainer>
                {commentData.viewComment.replies?.map((comment) => (
                  <PostComment
                    key={comment.id}
                    comment={comment}
                    me={meData?.me || null}
                    clickable
                    marginBottom={10}
                  />
                ))}
              </RepliesContainer>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(ViewComment);

const RepliesCounterText = styled.span`
  font-family: inherit;
  font-size: 11pt;
  color: dimgrey;
`;

const CreateReplyContainer = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: space-between;
  align-items: center;
`;

const NoCommentsText = styled.div`
  font-size: 10pt;
  color: grey;
`;

const RepliesContainer = styled.div`
  margin-top: 12px;
`;
