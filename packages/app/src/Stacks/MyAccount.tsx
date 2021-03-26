import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EditProfile } from "../Screens/EditProfile";
import { MyAccount } from "../Screens/MyAccount";
import { HeaderOptions } from "../Styles/Header";
import { MyAccountParamList } from "../Types/MyAccountParamList";
import { StdRoutes } from "./StdRoutes";

const Stack = createStackNavigator<MyAccountParamList>();

export const MyAccountStack = ({}) => {
  return (
    <Stack.Navigator screenOptions={HeaderOptions}>
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{ headerTitle: "My Account" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerTitle: "Edit Profile" }}
      />
      {StdRoutes(Stack as any)}
    </Stack.Navigator>
  );
};
