import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileController } from "../../../../modules/account/profile/ProfileController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { ProfileParamList } from "./ParamList";

const Stack = createStackNavigator<ProfileParamList>();
export const ProfileStack: React.FC = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileController}
        options={{
          headerTitle: t("my_account.my_profile"),
        }}
      />
    </Stack.Navigator>
  );
};
