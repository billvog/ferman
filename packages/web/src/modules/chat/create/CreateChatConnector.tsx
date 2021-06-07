import { CreateChatController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { CreateChatView } from "./CreateChatView";

interface CreateChatConnectorProps {}
export const CreateChatConnector: React.FC<CreateChatConnectorProps> = () => {
  const router = useRouter();

  const onControllerFinish = (chatId?: string) => {
    if (chatId) router.replace(`/chat/${chatId}`);
  };

  return (
    <CreateChatController onFinish={onControllerFinish}>
      {(props) => <CreateChatView {...props} />}
    </CreateChatController>
  );
};
