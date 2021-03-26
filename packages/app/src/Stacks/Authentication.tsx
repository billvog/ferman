import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { Center } from "../Components/Center";
import { Login } from "../Screens/Login";
import { Register } from "../Screens/Register";
import { HeaderOptions } from "../Styles/Header";
import { AuthNavProps, AuthParamList } from "../Types/AuthParamList";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={HeaderOptions}>
        <Stack.Screen
          name="Login"
          options={{
            headerTitle: "Sign in",
          }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerTitle: "Sign up",
          }}
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
