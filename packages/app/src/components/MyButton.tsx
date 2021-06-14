import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  ActivityIndicator,
  ButtonProps,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors, fontFamily, fontSize, radius } from "../constants/style";
import { Spinner } from "./Spinner";

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

type sizeKeys = "big" | "small" | "tiny";
const sizeStyles: {
  [key in sizeKeys]: { view: StyleProp<ViewStyle>; text: StyleProp<TextStyle> };
} = {
  big: {
    view: {
      paddingHorizontal: 19,
      paddingVertical: 12,
    },
    text: {
      fontSize: fontSize.paragraph,
    },
  },
  small: {
    view: {
      paddingHorizontal: 16,
      paddingVertical: 9,
    },
    text: {
      fontSize: fontSize.paragraph,
    },
  },
  tiny: {
    view: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    text: {
      fontSize: fontSize.small,
    },
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
        ...(sizeStyles[size].view as any),
        ...(colorStyles[style] as any),
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: fontFamily.inter.bold,
          opacity: isLoading ? 0 : 100,
          ...(sizeStyles[size].text as any),
        }}
      >
        {title}
      </Text>
      {isLoading && (
        <Spinner
          size={size === "tiny" ? "vs" : "s"}
          color={colors.text}
          style={{ position: "absolute" }}
        />
      )}
    </TouchableOpacity>
  );
};
