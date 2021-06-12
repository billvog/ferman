import React from "react";
import { View } from "react-native";
import { Spinner } from "./Spinner";

interface FullSpinnerProps {}

export const FullSpinner: React.FC<FullSpinnerProps> = ({}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </View>
  );
};
