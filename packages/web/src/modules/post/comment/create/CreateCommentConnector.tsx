import { CreateCommentController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { CreateCommentView } from "./CreateCommentView";

interface CreateCommentConnectorProps {
  onFinish: () => any;
}

export const CreateCommentConnector: React.FC<CreateCommentConnectorProps> = ({
  onFinish,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const [postId, setPostId] = useState("");
  const [replyCommentId, setReplyCommentId] =
    useState<string | undefined>(undefined);

  const onControllerFinish = (commentId: string) => {
    onFinish();
    toast.info(
      <div>
        {t("comment.alert.created.text")}.
        <span
          onClick={() => router.push(`/post/${postId}/comment/${commentId}`)}
          className="block hover:underline font-bold"
        >
          {t("comment.alert.created.view")}
        </span>
      </div>,
      {
        position: "bottom-center",
      }
    );
  };

  useEffect(() => {
    if (router.query.postId) setPostId(router.query.postId as string);
    if (router.query.commentId)
      setReplyCommentId(router.query.commentId as string);
  }, [router.query]);

  return (
    <CreateCommentController
      onFinish={onControllerFinish}
      postId={postId}
      reply={replyCommentId}
    >
      {(props) => (
        <CreateCommentView
          {...props}
          reply={typeof replyCommentId === "string"}
        />
      )}
    </CreateCommentController>
  );
};
