import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Search } from "../Screens/Search";
import { HeaderOptions } from "../Styles/Header";
import { StdRoutes } from "./StdRoutes";

const Stack = createStackNavigator();

export const SearchStack = ({}) => {
  return (
    <Stack.Navigator screenOptions={HeaderOptions}>
      <Stack.Screen name="Search" component={Search} />
      {StdRoutes(Stack as any)}
    </Stack.Navigator>
  );
};
