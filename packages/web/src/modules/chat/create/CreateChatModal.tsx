import React from "react";
import { MyDialog } from "../../../components/MyDialog";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../../display/HeaderController";
import { CreateChatConnector } from "./CreateChatConnector";

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <HeaderController title={t("chat.new_chat")} />
      <MyDialog title={t("chat.new_chat")} isOpen={isOpen} onClose={onClose}>
        <CreateChatConnector />
      </MyDialog>
    </>
  );
};
