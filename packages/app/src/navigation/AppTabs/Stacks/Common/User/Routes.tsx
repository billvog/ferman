import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { PostController } from "../../../../../modules/post/PostController";
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
        component={PostController}
        options={{
          headerTitle: "User",
        }}
      />
    </>
  );
};
