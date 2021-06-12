import React from "react";
import { AuthStack } from "./AuthStack";
import { Text } from "react-native";
import { useMeQuery } from "../../../controller/dist";

interface AuthSwitchProps {}

export const AuthSwitch: React.FC<AuthSwitchProps> = ({}) => {
  const { data, error } = useMeQuery();

  if (error) {
    return (
      <Text
        style={{
          color: "red",
          fontWeight: "500",
          fontSize: 16,
        }}
      >
        Internal server error occured.
      </Text>
    );
  }

  if (data && data.me) {
    return <Text>You are logged in as {data.me.uid}</Text>;
  }

  return <AuthStack />;
};
