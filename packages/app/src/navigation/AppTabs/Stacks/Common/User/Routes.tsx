import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { UserFollowersController } from "../../../../../modules/users/UserFollowersController";
import { UserProfileController } from "../../../../../modules/users/UserProfileController";
import { useTypeSafeTranslation } from "../../../../../shared-hooks/useTypeSafeTranslation";
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
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileController}
        options={{
          headerTitle: t("user.raw"),
        }}
      />
      <Stack.Screen
        name="UserFollowers"
        component={UserFollowersController}
        options={{
          headerTitle: t("user.followers.raw"),
        }}
      />
      <Stack.Screen
        name="UserFollowings"
        component={UserProfileController}
        options={{
          headerTitle: t("user.followings.raw"),
        }}
      />
    </>
  );
};
