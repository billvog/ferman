import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../../../components/ErrorText";
import { Layout } from "../../../../components/Layout";
import { PostComment } from "../../../../components/PostComment";
import { useMeQuery, useCommentQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../../../utils/withMyApollo";
import { MySpinner } from "../../../../components/MySpinner";
import { MyButton } from "../../../../components/MyButton";
import { CommentOpenGraphPreview } from "../../../../components/CommentOpenGraphPreview";

const comment = ({}) => {
  const router = useRouter();
  const id = typeof router.query.cid === "string" ? router.query.cid : "";

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: commentData, loading: commentLoading } = useCommentQuery({
    skip: typeof id !== "string",
    variables: {
      id,
    },
  });

  return (
    <CommentOpenGraphPreview comment={commentData?.comment.parent}>
      <Layout
        title={
          commentData?.comment
            ? `${commentData?.comment.parent.user.username}: "${commentData?.comment.parent.text}" – Ferman`
            : "Ferman"
        }
      >
        {commentLoading || meLoading ? (
          <MySpinner />
        ) : !commentData?.comment ? (
          <ErrorText>Comment could not be found</ErrorText>
        ) : !commentData || !meData ? (
          <ErrorText>Internal server error, please try again later</ErrorText>
        ) : (
          <div>
            <div>
              <PostComment
                comment={commentData.comment.parent}
                me={meData.me || null}
                onDelete={router.back}
              />
            </div>
            <div className="flex mt-6 justify-between items-center">
              <div className="text-md text-gray-600">
                <b>Replies</b>{" "}
                {!!commentData?.comment?.replies.length &&
                  `(${commentData?.comment?.replies.length})`}
              </div>
              {meData?.me && (
                <MyButton
                  onClick={() => {
                    router.push(
                      `/post/${commentData.comment.parent.postId}/comment?reply=${commentData.comment.parent.id}`
                    );
                  }}
                >
                  reply
                </MyButton>
              )}
            </div>
            <div>
              {commentData.comment?.replies.length === 0 ? (
                <div className="text-sm text-gray-500">There no replies...</div>
              ) : (
                <div className="mt-3 space-y-2">
                  {commentData.comment.replies?.map((comment) => (
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
    </CommentOpenGraphPreview>
  );
};

export default withMyApollo({
  ssr: true,
})(comment);
