import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  ActivityIndicator,
  ButtonProps,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors, fontSize, radius } from "../constants/style";

type colorKeys = "primary" | "accent" | "secondary" | "danger" | "success";
const colorStyles: {
  [key in colorKeys]: StyleProp<ViewStyle>;
} = {
  primary: {
    backgroundColor: colors.primary700,
  },
  accent: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.secondary600,
  },
  danger: {
    backgroundColor: colors.error,
  },
  success: {
    backgroundColor: colors.success,
  },
};

type sizeKeys = "big" | "small";
const sizeStyles: {
  [key in sizeKeys]: StyleProp<ViewStyle>;
} = {
  big: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  small: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
};

interface MyButtonProps extends ButtonProps {
  isLoading?: boolean;
  style?: colorKeys;
  size?: sizeKeys;
}

export const MyButton: React.FC<MyButtonProps> = ({
  isLoading,
  onPress,
  style = "secondary",
  size = "small",
  title,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: radius.m,
        ...(sizeStyles[size] as any),
        ...(colorStyles[style] as any),
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontWeight: "700",
          fontSize: fontSize.paragraph,
          opacity: isLoading ? 0 : 100,
        }}
      >
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={colors.text}
          style={{
            position: "absolute",
          }}
        />
      )}
    </TouchableOpacity>
  );
};
