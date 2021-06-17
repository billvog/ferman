import React from "react";
import { ChatroomController } from "@ferman-pkgs/controller";
import { ChatroomView } from "./ChatroomView";
import { ChatNavProps } from "../../../navigation/AppTabs/Stacks/Chat/ParamList";

export const ChatroomConnector: React.FC<any> = ({
  route,
}: ChatNavProps<"Chatroom">) => {
  return (
    <ChatroomController chatId={route.params.chatId}>
      {(props) => <ChatroomView {...props} />}
    </ChatroomController>
  );
};
