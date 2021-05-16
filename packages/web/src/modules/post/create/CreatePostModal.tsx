import React from "react";
import { MyDialog } from "../../../components/MyDialog";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { CreatePostConnector } from "./CreatePostConnector";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <MyDialog title={t("post.post")} isOpen={isOpen} onClose={onClose}>
      <CreatePostConnector />
    </MyDialog>
  );
};