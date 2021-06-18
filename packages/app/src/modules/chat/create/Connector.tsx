import React from "react";
import { CreateChatController } from "@ferman-pkgs/controller";
import {
  ChatNavProps,
  ChatParamList,
} from "../../../navigation/AppTabs/Stacks/Chat/ParamList";
import { CreateChatView } from "./View";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const CreateChatConnector: React.FC<any> = () => {
  const navigation = useNavigation<StackNavigationProp<ChatParamList>>();
  const onControllerFinish = (chatId?: string) => {
    if (chatId) navigation.replace("Chatroom", { chatId });
  };

  return (
    <CreateChatController onFinish={onControllerFinish}>
      {(props) => <CreateChatView {...props} />}
    </CreateChatController>
  );
};
