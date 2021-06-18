import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { CreatePostConnector } from "../../../../../modules/post/create/CreatePostConnector";
import { PostController } from "../../../../../modules/post/PostController";
import { useTypeSafeTranslation } from "../../../../../shared-hooks/useTypeSafeTranslation";
import { ChatParamList } from "../../Chat/ParamList";
import { HomeParamList } from "../../Home/ParamList";
import { ProfileParamList } from "../../Profile/ParamList";
import { SearchParamList } from "../../Search/ParamList";

export const CommonPostRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList | ChatParamList | ProfileParamList,
    StackNavigationState<Record<string, object>>,
    StackNavigationOptions,
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
