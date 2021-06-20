import React from "react";
import { ActivityIndicator, Platform, ViewProps } from "react-native";
import { colors } from "../constants/style";

type sizeKeys = "vs" | "s" | "m";
export type SpinnerProps = ViewProps & {
  size?: sizeKeys;
  color?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({
  style,
  size = "m",
  color = colors.primary600,
}) => {
  return (
    <ActivityIndicator
      style={style}
      color={color}
      size={
        Platform.OS === "android"
          ? size === "vs"
            ? 12
            : size === "s"
            ? 14
            : 32
          : size === "vs" || size === "s"
          ? "small"
          : "large"
      }
    />
  );
};
