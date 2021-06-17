import React from "react";
import { ChatroomController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import { ChatroomView } from "./ChatroomView";

interface ChatroomConnectorProps {}

export const ChatroomConnector: React.FC<ChatroomConnectorProps> = ({}) => {
  const { query } = useRouter();

  return (
    <ChatroomController chatId={(query.chatId as string) || ""}>
      {(props) => <ChatroomView {...props} />}
    </ChatroomController>
  );
};
