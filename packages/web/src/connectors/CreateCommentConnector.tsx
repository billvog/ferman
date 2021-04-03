import { useToast } from "@chakra-ui/toast";
import { CommentController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { CreateCommentView } from "../views/CreateCommentView";

interface CreateCommentConnectorProps {}
export const CreateCommentConnector: React.FC<CreateCommentConnectorProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();

  return (
    <CommentController
      postId={router.query.id as string}
      reply={(router.query.reply as string) || undefined}
      onFinish={() => {
        toast({
          title: "Success",
          description: "Comment posted",
          status: "success",
          duration: 5000,
        });

        router.back();
      }}
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
