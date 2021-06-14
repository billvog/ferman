import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { colors, fontFamily, fontSize } from "../constants/style";

interface ErrorTextProps {}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
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
          fontSize: fontSize.h5,
          color: colors.error,
        }}
      >
        {children}
      </Text>
    </View>
  );
};
