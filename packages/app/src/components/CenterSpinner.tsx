import React from "react";
import { View } from "react-native";
import { Spinner } from "./Spinner";

interface CenterSpinnerProps {}
export const CenterSpinner: React.FC<CenterSpinnerProps> = ({}) => {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      children={<Spinner size="m" />}
    />
  );
};
