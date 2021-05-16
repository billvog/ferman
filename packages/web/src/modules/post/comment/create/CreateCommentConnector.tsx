import { CommentController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { CreateCommentView } from "./CreateCommentView";

interface CreateCommentConnectorProps {
  onFinish?: () => any;
}

export const CreateCommentConnector: React.FC<CreateCommentConnectorProps> = ({
  onFinish = () => {},
}) => {
  const router = useRouter();
  return (
    <CommentController
      onFinish={onFinish}
      postId={router.query.postId as string}
      reply={(router.query.commentId as string) || undefined}
    >
      {(props) => (
        <CreateCommentView
          {...props}
          reply={typeof (router.query.commentId as string) === "string"}
        />
      )}
    </CommentController>
  );
};
