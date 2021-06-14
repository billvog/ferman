import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SearchController } from "../../../../modules/search/SearchController";
import { CommonRoutes } from "../Common/CommonRoutes";
import { SearchParamList } from "./ParamList";

const Stack = createStackNavigator<SearchParamList>();
export const SearchStack: React.FC = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      {CommonRoutes(Stack as any)}
      <Stack.Screen name="Search" component={SearchController} />
    </Stack.Navigator>
  );
};
