import React, { useState } from "react";
import { MyDialog } from "../../../components/MyDialog";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
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

  const [title, setTitle] = useState(<div>{t("post.post")}</div>);
  const setModalTitle = (t: JSX.Element) => {
    setTitle(t);
  };

  return (
    <>
      <HeaderController title={t("post.post")} />
      <MyDialog title={title} isOpen={isOpen} onClose={onClose}>
        <CreatePostConnector setModalTitle={setModalTitle} onFinish={onClose} />
      </MyDialog>
    </>
  );
};
