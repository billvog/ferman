import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { FeedController } from "../../../../modules/feed/FeedController";
import { CommonRoutes } from "../Common/CommonRoutes";
import { HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      {CommonRoutes(Stack as any)}
      <Stack.Screen name="Feed" component={FeedController} />
    </Stack.Navigator>
  );
};
