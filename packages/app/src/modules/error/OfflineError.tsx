import React from "react";
import { View, Text } from "react-native";
import { colors, fontSize } from "../../constants/style";

interface OfflineErrorProps {}

export const OfflineError: React.FC<OfflineErrorProps> = ({}) => {
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
          color: colors.error,
          fontWeight: "600",
          fontSize: fontSize.paragraph,
        }}
      >
        Your offline. Check your connection.
      </Text>
    </View>
  );
};
