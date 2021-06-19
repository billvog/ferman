import React from "react";
import {
  ActivityIndicator,
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
    height: 10,
    width: 10,
  },
  s: {
    borderWidth: 2,
    height: 14,
    width: 14,
  },
  m: {
    borderWidth: 4,
    height: 24,
    width: 24,
  },
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
      size={size === "vs" ? 12 : size === "s" ? 18 : 32}
    />
  );

  // let spinValue = new Animated.Value(0.01);

  // Animated.loop(
  //   Animated.timing(spinValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   })
  // ).start();

  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "360deg"],
  // });

  // return (
  //   <Animated.View
  //     style={[
  //       style,
  //       {
  //         borderRadius: 100 / 2,
  //         borderColor: "transparent",
  //         borderTopColor: color,
  //         borderLeftColor: color,
  //         transform: [{ rotate: spin }],
  //         ...(sizeOptions[size] as any),
  //       },
  //     ]}
  //   />
  // );
};
