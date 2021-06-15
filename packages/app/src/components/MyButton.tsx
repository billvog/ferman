import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import {
  ActivityIndicator,
  ButtonProps,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  colors,
  fontFamily,
  fontSize,
  paragraphBold,
  radius,
} from "../constants/style";
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
    backgroundColor: colors.danger,
  },
  success: {
    backgroundColor: colors.success,
  },
};

type sizeKeys = "big" | "small" | "medium" | "tiny";
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
  medium: {
    view: {
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    text: {
      fontSize: fontSize.md,
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

type MyButtonProps = {
  onPress: () => any;
  isLoading?: boolean;
  loadingColor?: string;
  color?: colorKeys;
  size?: sizeKeys;
};

export const MyButton: React.FC<MyButtonProps> = ({
  isLoading,
  onPress,
  color = "secondary",
  size = "small",
  loadingColor = colors.text,
  children,
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
        ...(colorStyles[color] as any),
      }}
    >
      <View
        style={{
          opacity: isLoading ? 0 : 100,
        }}
      >
        {typeof children === "string" ||
        (Array.isArray(children) && typeof children[0] === "string") ? (
          <Text
            style={{
              color: colors.text,
              fontFamily: fontFamily.inter.bold,
              ...(sizeStyles[size].text as any),
            }}
          >
            {children}
          </Text>
        ) : (
          children
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
