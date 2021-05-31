import React from "react";
import { WithAuthProps } from "../../types/WithAuthProps";

interface ChatControllerProps extends WithAuthProps {}

export const ChatController: React.FC<ChatControllerProps> = ({
  loggedUser,
}) => {
  return <div></div>;
};
