import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { colors, fontFamily } from "../../../../constants/style";
import { ChatroomConnector } from "../../../../modules/chat/chatroom/ChatroomConnector";
import { ChatsController } from "../../../../modules/chat/ChatsController";
import { CreateChatConnector } from "../../../../modules/chat/create/Connector";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { CommonRoutes } from "../Common/CommonRoutes";
import { ChatNavProps, ChatParamList } from "./ParamList";

const Stack = createStackNavigator<ChatParamList>();
export const ChatStack: React.FC<any> = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator initialRouteName="Chats" screenOptions={headerOptions}>
      {CommonRoutes(Stack)}
      <Stack.Screen
        name="Chats"
        component={ChatsController}
        options={({ navigation }: ChatNavProps<"Chats">) => ({
          headerTitle: t("chat.title"),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() =>
                navigation.navigate("CreateChat", { submitForm: undefined })
              }
            >
              <AntDesign
                name="pluscircle"
                size={21.5}
                color={colors.accentWashedOut}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Chatroom"
        component={ChatroomConnector}
        options={{
          headerTitle: t("chat.title"),
        }}
      />
      <Stack.Screen
        name="CreateChat"
        component={CreateChatConnector}
        options={({ route }) => ({
          headerTitle: t("chat.create_chat.title"),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                route.params.submitForm?.();
              }}
              style={{
                marginRight: 14,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.inter.medium,
                  color: colors.primary600,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
