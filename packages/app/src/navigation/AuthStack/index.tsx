import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthParamList } from "./ParamList";
import { LoginConnector } from "../../modules/account/login/LoginConnector";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginConnector}
        options={{
          headerTitle: t("login.title"),
        }}
      />
    </Stack.Navigator>
  );
};
