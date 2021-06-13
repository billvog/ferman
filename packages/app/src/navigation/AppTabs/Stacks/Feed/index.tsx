import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { FeedController } from "../../../../modules/feed/FeedController";
import { FeedParamList } from "./ParamList";

const Stack = createStackNavigator<FeedParamList>();
export const FeedStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedController} />
    </Stack.Navigator>
  );
};
