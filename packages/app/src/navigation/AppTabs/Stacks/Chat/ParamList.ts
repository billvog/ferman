import { NavigationProp, RouteProp } from "@react-navigation/native";

export type ChatParamList = {
  Chats: undefined;
  Chatroom: {
    chatId: string;
  };
};

export type ChatNavProps<T extends keyof ChatParamList> = {
  navigation: NavigationProp<ChatParamList, T>;
  route: RouteProp<ChatParamList, T>;
};
