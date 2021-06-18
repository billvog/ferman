import { NavigationProp, RouteProp } from "@react-navigation/native";
import { CommonParamList } from "../Common/CommonParamList";

export type ChatParamList = {
  Chats: undefined;
  Chatroom: {
    chatId: string;
  };
  CreateChat: {
    submitForm?: (() => Promise<void>) & (() => Promise<any>);
  };
} & CommonParamList;

export type ChatNavProps<T extends keyof ChatParamList> = {
  navigation: NavigationProp<ChatParamList, T>;
  route: RouteProp<ChatParamList, T>;
};
