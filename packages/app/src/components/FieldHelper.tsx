import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { colors, fontFamily, xsmall } from "../constants/style";

interface FieldHelperProps {}
export const FieldHelper: React.FC<FieldHelperProps> = ({ children }) => {
  return <Text style={styles.helperText}>{children}</Text>;
};

const styles = StyleSheet.create({
  helperText: {
    ...xsmall,
    marginTop: 5,
    marginHorizontal: 1,
    color: colors.primary450,
    fontFamily: fontFamily.inter.medium,
  },
});
