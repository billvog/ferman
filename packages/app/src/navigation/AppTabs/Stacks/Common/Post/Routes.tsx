import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { PostController } from "../../../../../modules/post/PostController";
import { HomeParamList } from "../../Home/ParamList";
import { SearchParamList } from "../../Search/ParamList";

export const CommonPostRoutes = (
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
        name="ViewPost"
        component={PostController}
        options={{
          headerTitle: "Post",
        }}
      />
    </>
  );
};
