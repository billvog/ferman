import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { FeedController } from "../../../../modules/feed/FeedController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { CommonRoutes } from "../Common/CommonRoutes";
import { HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={headerOptions}>
      {CommonRoutes(Stack as any)}
      <Stack.Screen
        name="Feed"
        component={FeedController}
        options={{
          headerTitle: t("index.feed"),
        }}
      />
    </Stack.Navigator>
  );
};
