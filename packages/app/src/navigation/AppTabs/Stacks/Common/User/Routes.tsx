import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors, fontFamily } from "../../../../../constants/style";
import { EditProfileConnector } from "../../../../../modules/account/edit/Connector";
import { UserFollowersController } from "../../../../../modules/user/UserFollowersController";
import { UserFollowingsController } from "../../../../../modules/user/UserFollowingsController";
import { UserProfileController } from "../../../../../modules/user/UserProfileController";
import { useTypeSafeTranslation } from "../../../../../shared-hooks/useTypeSafeTranslation";
import { ChatParamList } from "../../Chat/ParamList";
import { HomeParamList } from "../../Home/ParamList";
import { ProfileParamList } from "../../Profile/ParamList";
import { SearchParamList } from "../../Search/ParamList";

export const CommonUserRoutes = (
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
        name="EditProfile"
        component={EditProfileConnector}
        options={({ route }) => ({
          headerTitle: t("edit_profile.title"),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                route.params.submitForm?.();
              }}
              style={{
                marginRight: 14,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.inter.medium,
                  color: colors.primary600,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
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
