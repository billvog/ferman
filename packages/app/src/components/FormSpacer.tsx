import React from "react";
import { View } from "react-native";

interface FormSpacerProps {}
export const FormSpacer: React.FC<FormSpacerProps> = ({ children }) => {
  return <View style={{ marginBottom: 20 }}>{children}</View>;
};
