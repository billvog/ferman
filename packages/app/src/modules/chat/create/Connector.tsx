import React from "react";
import { CreateChatController } from "@ferman-pkgs/controller";
import { ChatNavProps } from "../../../navigation/AppTabs/Stacks/Chat/ParamList";
import { CreateChatView } from "./View";

export const CreateChatConnector: React.FC<any> = ({
  navigation,
}: ChatNavProps<"CreateChat">) => {
  const onControllerFinish = (chatId?: string) => {
    if (chatId) navigation.navigate("Chatroom", { chatId });
  };

  return (
    <CreateChatController onFinish={onControllerFinish}>
      {(props) => <CreateChatView {...props} />}
    </CreateChatController>
  );
};
