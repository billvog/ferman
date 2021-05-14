import { toast } from "react-toastify";
import { CommentController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { CreateCommentView } from "./CreateCommentView";

interface CreateCommentConnectorProps {
  onFinish?: () => void;
}

export const CreateCommentConnector: React.FC<CreateCommentConnectorProps> = ({
  onFinish,
}) => {
  const router = useRouter();

  const finished = () => {
    toast.success("Comment successfully created");
    if (typeof onFinish === "function") onFinish();
  };

  return (
    <CommentController
      postId={router.query.postId as string}
      reply={(router.query.reply as string) || undefined}
      onFinish={finished}
    >
      {(props) => (
        <CreateCommentView
          {...props}
          reply={typeof (router.query.reply as string) === "string"}
        />
      )}
    </CommentController>
  );
};
