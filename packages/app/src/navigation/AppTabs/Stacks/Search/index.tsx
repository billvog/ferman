import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SearchController } from "../../../../modules/search/SearchController";
import { SearchParamList } from "./ParamList";

const Stack = createStackNavigator<SearchParamList>();
export const SearchStack: React.FC = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchController} />
    </Stack.Navigator>
  );
};
