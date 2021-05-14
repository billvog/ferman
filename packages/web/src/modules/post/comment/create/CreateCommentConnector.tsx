import { toast } from "react-toastify";
import { CommentController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { CreateCommentView } from "./CreateCommentView";

interface CreateCommentConnectorProps {}
export const CreateCommentConnector: React.FC<CreateCommentConnectorProps> = ({}) => {
  const router = useRouter();

  const finished = () => {
    toast.success("Comment posted");
    router.back();
  };

  return (
    <CommentController
      postId={router.query.id as string}
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
