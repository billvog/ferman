import React from "react";
import {
  Animated,
  Easing,
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/style";

type sizeKeys = "vs" | "s" | "m";
export type SpinnerProps = ViewProps & {
  size?: sizeKeys;
  color?: string;
};

const sizeOptions: {
  [key in sizeKeys]: StyleProp<ViewStyle>;
} = {
  vs: {
    borderWidth: 2,
    borderRadius: 6,
    height: 10,
    width: 10,
  },
  s: {
    borderWidth: 2,
    borderRadius: 6,
    height: 14,
    width: 14,
  },
  m: {
    borderWidth: 4,
    borderRadius: 12,
    height: 24,
    width: 24,
  },
};

export const Spinner: React.FC<SpinnerProps> = ({
  style,
  size = "m",
  color = colors.primary600,
}) => {
  let spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          borderColor: "transparent",
          borderTopColor: color,
          borderLeftColor: color,
          transform: [{ rotate: spin }],
          ...(sizeOptions[size] as any),
        },
      ]}
    />
  );
};
