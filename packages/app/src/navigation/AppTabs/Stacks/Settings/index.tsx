import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React from "react";
import { LanguageController } from "../../../../modules/settings/language/LanguageController";
import { NotificationsController } from "../../../../modules/settings/notifications/NotificationsController";
import { SettingsController } from "../../../../modules/settings/SettingsController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { ProfileParamList } from "../Profile/ParamList";

export const SettingsRoutes = (
  Stack: TypedNavigator<
    ProfileParamList,
    StackNavigationState<Record<string, object | undefined>>,
    any,
    any,
    any
  >
) => {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <Stack.Screen
        name="Settings"
        component={SettingsController}
        options={{
          headerTitle: t("settings.title"),
        }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={LanguageController}
        options={{
          headerTitle: t("settings.language.title"),
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsController}
        options={{
          headerTitle: t("settings.notifications.title"),
        }}
      />
    </>
  );
};
