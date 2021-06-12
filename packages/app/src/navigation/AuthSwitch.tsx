import { useMeQuery } from "@ferman-pkgs/controller";
import React from "react";
import { Text } from "react-native";

interface AuthSwitchProps {}

export const AuthSwitch: React.FC<AuthSwitchProps> = ({}) => {
  const { data } = useMeQuery();

  if (data?.me) {
    <Text>auth</Text>;
  }

  return <Text>not auth</Text>;
};
