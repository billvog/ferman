import React from "react";
import { Text, View } from "react-native";

interface ErrorTextProps {}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          color: "indianred",
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {children}
      </Text>
    </View>
  );
};
