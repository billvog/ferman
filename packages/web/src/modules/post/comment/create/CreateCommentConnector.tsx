import { toast } from "react-toastify";
import { CommentController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { CreateCommentView } from "./CreateCommentView";

interface CreateCommentConnectorProps {}
export const CreateCommentConnector: React.FC<CreateCommentConnectorProps> = ({}) => {
  const router = useRouter();

  return (
    <CommentController
      postId={router.query.postId as string}
      reply={(router.query.reply as string) || undefined}
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
