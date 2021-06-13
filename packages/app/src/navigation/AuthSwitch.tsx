import React from "react";
import { AuthStack } from "./AuthStack";
import { useContext } from "react";
import { AuthContext } from "../modules/auth/AuthProvider";
import { AppTabs } from "./AppTabs";
import { NavigationContainer } from "@react-navigation/native";

export const AuthSwitch: React.FC = ({}) => {
  const { me } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {me ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
