import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors, fontFamily } from "../../../../constants/style";
import { FeedController } from "../../../../modules/feed/FeedController";
import { CommonRoutes } from "../Common/CommonRoutes";
import { HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerTintColor: colors.primary600,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: fontFamily.inter.bold,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      {CommonRoutes(Stack as any)}
      <Stack.Screen name="Feed" component={FeedController} />
    </Stack.Navigator>
  );
};
