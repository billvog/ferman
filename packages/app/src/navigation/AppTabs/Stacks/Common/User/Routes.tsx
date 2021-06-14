import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { UserProfileController } from "../../../../../modules/user/UserProfileController";
import { HomeParamList } from "../../Home/ParamList";
import { SearchParamList } from "../../Search/ParamList";

export const CommonUserRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList,
    StackNavigationState<Record<string, object>>,
    any,
    any,
    any
  >
) => {
  return (
    <>
      <Stack.Screen
        name="ViewUserProfile"
        component={UserProfileController}
        options={{
          headerTitle: "User",
        }}
      />
    </>
  );
};
