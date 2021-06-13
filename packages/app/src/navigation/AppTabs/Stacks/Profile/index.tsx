import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileController } from "../../../../modules/account/profile/ProfileController";
import { ProfileParamList } from "./ParamList";

const Stack = createStackNavigator<ProfileParamList>();
export const ProfileStack: React.FC = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileController} />
    </Stack.Navigator>
  );
};
