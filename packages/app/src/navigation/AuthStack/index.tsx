import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthParamList } from "./ParamList";
import { LoginConnector } from "../../modules/account/login/LoginConnector";

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginConnector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
