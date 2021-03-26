import { Spinner } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Center } from "./Center";

interface LoadingProps {
  size?: "small" | "large";
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "large",
  color = "grey",
}) => {
  return (
    <Center>
      <ActivityIndicator size={size} color={color} animating />
    </Center>
  );
};
