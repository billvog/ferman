import React from "react";
import { StyleProp, View, ViewStyle, Text } from "react-native";
import { colors, fontSize, paragraph, radius } from "../constants/style";

const colorStyles = {
  success: {
    backgroundColor: colors.success,
  } as StyleProp<ViewStyle>,
  error: {
    backgroundColor: colors.error,
  } as StyleProp<ViewStyle>,
};

interface MyAlertProps {
  color: keyof typeof colorStyles;
}

export const MyAlert: React.FC<MyAlertProps> = ({
  children,
  color = "success",
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8.5,
        borderRadius: radius.m,
        ...(colorStyles[color] as any),
      }}
    >
      <Text
        style={{
          ...paragraph,
          color: colors.text,
          fontWeight: "800",
        }}
      >
        {children as any}
      </Text>
    </View>
  );
};
