import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { MainParamList } from "./ParamList";
import { FeedController } from "../../modules/feed/FeedController";

const Stack = createStackNavigator<MainParamList>();
export const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedController} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
