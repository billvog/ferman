import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { CreatePostConnector } from "../../../../../modules/post/create/CreatePostConnector";
import { PostController } from "../../../../../modules/post/PostController";
import { useTypeSafeTranslation } from "../../../../../shared-hooks/useTypeSafeTranslation";
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
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <Stack.Screen
        name="ViewPost"
        component={PostController}
        options={{
          headerTitle: t("post.raw"),
        }}
      />
      <Stack.Screen
        name="ReplyPost"
        component={CreatePostConnector}
        options={{
          headerTitle: t("post.reply"),
        }}
      />
    </>
  );
};
