import React from "react";
import { AuthStack } from "./AuthStack";
import { MainStack } from "./MainStack";
import { useContext } from "react";
import { AuthContext } from "../modules/auth/AuthProvider";

interface AuthSwitchProps {}

export const AuthSwitch: React.FC<AuthSwitchProps> = ({}) => {
  const { me } = useContext(AuthContext);

  if (me) {
    return <MainStack />;
  }

  return <AuthStack />;
};
