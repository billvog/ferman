import { CreateChatController } from "@ferman-pkgs/controller";
import React from "react";
import { CreateChatView } from "./CreateChatView";

interface CreateChatConnectorProps {}
export const CreateChatConnector: React.FC<CreateChatConnectorProps> = () => {
  return (
    <CreateChatController onFinish={() => {}}>
      {(props) => <CreateChatView {...props} />}
    </CreateChatController>
  );
};
