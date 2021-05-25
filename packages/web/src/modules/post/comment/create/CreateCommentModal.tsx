import { useRouter } from "next/router";
import React from "react";
import { MyDialog } from "../../../../components/MyDialog";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../../display/HeaderController";
import { CreateCommentConnector } from "./CreateCommentConnector";

interface CreateCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCommentModal: React.FC<CreateCommentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTypeSafeTranslation();
  const { query } = useRouter();
  return (
    <>
      <HeaderController
        title={t(query.commentId ? "comment.reply" : "comment.comment")}
      />
      <MyDialog
        title={t(query.commentId ? "comment.reply" : "comment.comment")}
        isOpen={isOpen}
        onClose={onClose}
      >
        <CreateCommentConnector onFinish={onClose} />
      </MyDialog>
    </>
  );
};
