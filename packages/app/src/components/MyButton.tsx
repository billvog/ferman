import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import {
  ActivityIndicator,
  ButtonProps,
  Text,
  TouchableOpacity,
} from "react-native";
import { colors, fontFamily, fontSize, radius } from "../constants/style";
import { Spinner } from "./Spinner";

type colorKeys =
  | "transparent"
  | "primary"
  | "accent"
  | "secondary"
  | "danger"
  | "success";
const colorStyles: {
  [key in colorKeys]: StyleProp<ViewStyle>;
} = {
  transparent: {
    backgroundColor: "transparent",
  },
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
      paddingHorizontal: 8.5,
      paddingVertical: 4,
    },
    text: {
      fontSize: fontSize.small,
    },
  },
};

type MyButtonProps = ButtonProps & {
  title?: string;
  icon?: JSX.Element;
  isLoading?: boolean;
  loadingColor?: string;
  style?: colorKeys;
  size?: sizeKeys;
};

export const MyButton: React.FC<MyButtonProps> = ({
  isLoading,
  onPress,
  style = "secondary",
  size = "small",
  loadingColor = colors.text,
  title = null,
  icon = null,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: !!icon ? 12 : radius.m,
        ...(sizeStyles[size].view as any),
        ...(colorStyles[style] as any),
      }}
    >
      <View
        style={{
          opacity: isLoading ? 0 : 100,
        }}
      >
        {!icon ? (
          <Text
            style={{
              color: colors.text,
              fontFamily: fontFamily.inter.bold,
              ...(sizeStyles[size].text as any),
            }}
          >
            {title}
          </Text>
        ) : (
          <View
            style={{
              paddingVertical: 4,
            }}
          >
            {icon}
          </View>
        )}
      </View>
      {isLoading && (
        <Spinner
          size={size === "tiny" ? "vs" : "s"}
          color={loadingColor}
          style={{ position: "absolute" }}
        />
      )}
    </TouchableOpacity>
  );
};
