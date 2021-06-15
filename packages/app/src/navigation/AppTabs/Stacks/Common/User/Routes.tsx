import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { UserFollowersController } from "../../../../../modules/user/UserFollowersController";
import { UserFollowingsController } from "../../../../../modules/user/UserFollowingsController";
import { UserProfileController } from "../../../../../modules/user/UserProfileController";
import { useTypeSafeTranslation } from "../../../../../shared-hooks/useTypeSafeTranslation";
import { HomeParamList } from "../../Home/ParamList";
import { ProfileParamList } from "../../Profile/ParamList";
import { SearchParamList } from "../../Search/ParamList";

export const CommonUserRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList | ProfileParamList,
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
        component={UserFollowingsController}
        options={{
          headerTitle: t("user.followings.raw"),
        }}
      />
    </>
  );
};
