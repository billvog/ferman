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
      title={
        commentData
          ? `${commentData?.viewComment.parent.user.username}: "${commentData?.viewComment.parent.text}" – Ferman`
          : "Comment – Ferman"
      }
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
          <div className="flex mt-6 justify-between items-center">
            <div className="text-md text-gray-600">
              <b>Replies</b>{" "}
              {!!commentData?.viewComment?.replies &&
                `(${commentData?.viewComment?.replies.length})`}
            </div>
            {meData?.me && (
              <MyButton
                onClick={() => {
                  router.push(
                    `/post/${commentData.viewComment.parent.postId}/comment?reply=${commentData.viewComment.parent.id}`
                  );
                }}
              >
                reply
              </MyButton>
            )}
          </div>
          <div>
            {commentData.viewComment?.replies.length === 0 ? (
              <div className="text-sm text-gray-500">There no replies...</div>
            ) : (
              <div className="mt-3 space-y-2">
                {commentData.viewComment.replies?.map((comment) => (
                  <PostComment
                    key={comment.id}
                    comment={comment}
                    me={meData?.me || null}
                    clickable
                  />
                ))}
              </div>
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
