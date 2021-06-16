import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { ChatroomController } from "../../../../modules/chat/chatroom/ChatroomController";
import { ChatsController } from "../../../../modules/chat/ChatsController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { HomeParamList } from "../Home/ParamList";

export const ChatRoutes: React.FC<any> = (
  Stack: TypedNavigator<
    HomeParamList,
    StackNavigationState<Record<string, object | undefined>>,
    StackNavigationOptions,
    any,
    any
  >
) => {
  const { t } = useTypeSafeTranslation();

  return (
    <>
      <Stack.Screen
        name="Chats"
        component={ChatsController}
        options={{
          headerTitle: t("chat.title"),
        }}
      />
      <Stack.Screen
        name="Chatroom"
        component={ChatroomController}
        options={{
          headerTitle: t("chat.title"),
        }}
      />
    </>
  );
};
