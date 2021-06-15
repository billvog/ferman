import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthParamList } from "./ParamList";
import { LoginConnector } from "../../modules/account/login/LoginConnector";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../styles/header";
import { RegisterConnector } from "../../modules/account/register/Connector";

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator screenOptions={headerOptions} initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginConnector}
        options={{
          headerTitle: t("login.title"),
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterConnector}
        options={{
          headerTitle: t("register.title"),
        }}
      />
    </Stack.Navigator>
  );
};
