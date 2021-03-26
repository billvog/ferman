import React from "react";
import { View } from "react-native";
import { GlobalStyles } from "../Styles/Global";

interface LayoutProps {
  container?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, container }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          alignSelf: "stretch",
          marginHorizontal: 12,
        },
        container ? GlobalStyles.Container : null,
      ]}
    >
      {children}
    </View>
  );
};
