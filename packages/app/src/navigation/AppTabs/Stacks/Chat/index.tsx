import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ChatroomConnector } from "../../../../modules/chat/chatroom/ChatroomConnector";
import { ChatsController } from "../../../../modules/chat/ChatsController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { ChatParamList } from "./ParamList";

const Stack = createStackNavigator<ChatParamList>();
export const ChatStack: React.FC<any> = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator initialRouteName="Chats" screenOptions={headerOptions}>
      <Stack.Screen
        name="Chats"
        component={ChatsController}
        options={{
          headerTitle: t("chat.title"),
        }}
      />
      <Stack.Screen
        name="Chatroom"
        component={ChatroomConnector}
        options={{
          headerTitle: t("chat.title"),
        }}
      />
    </Stack.Navigator>
  );
};
