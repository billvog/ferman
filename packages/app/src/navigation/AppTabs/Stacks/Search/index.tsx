import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SearchController } from "../../../../modules/search/SearchController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { CommonRoutes } from "../Common/CommonRoutes";
import { SearchParamList } from "./ParamList";

const Stack = createStackNavigator<SearchParamList>();
export const SearchStack: React.FC = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Stack.Navigator initialRouteName="Search" screenOptions={headerOptions}>
      {CommonRoutes(Stack as any)}
      <Stack.Screen
        name="Search"
        component={SearchController}
        options={{
          headerTitle: t("search.title"),
        }}
      />
    </Stack.Navigator>
  );
};
