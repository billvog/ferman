import React from "react";
import { MyDialog } from "../../../../components/MyDialog";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
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
  return (
    <MyDialog title={t("comment.comment")} isOpen={isOpen} onClose={onClose}>
      <CreateCommentConnector onFinish={onClose} />
    </MyDialog>
  );
};
