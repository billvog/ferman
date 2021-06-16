import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../../constants/style";
import { FeedController } from "../../../../modules/feed/FeedController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { ChatRoutes } from "../Chat";
import { CommonRoutes } from "../Common/CommonRoutes";
import { HomeNavProps, HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={headerOptions}>
      {CommonRoutes(Stack as any)}
      {ChatRoutes(Stack as any)}
      <Stack.Screen
        name="Feed"
        component={FeedController}
        options={({ navigation }: HomeNavProps<"Feed">) => ({
          headerTitle: t("index.feed"),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Chats")}
              style={{
                marginRight: 10,
              }}
            >
              <Ionicons
                name="ios-chatbubble-ellipses"
                size={20}
                color={colors.accentHover}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
