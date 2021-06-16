import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { colors, fontFamily, fontSize } from "../constants/style";

interface ErrorTextProps {
  size?: "normal" | "small";
}

export const ErrorText: React.FC<ErrorTextProps> = ({
  size = "normal",
  children,
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.inter.bold,
          fontSize: size === "normal" ? fontSize.h5 : fontSize.paragraph,
          color: colors.error,
        }}
      >
        {children}
      </Text>
    </View>
  );
};
