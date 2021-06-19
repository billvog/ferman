import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize } from "../../../constants/style";

export const userProfileTabStyles = StyleSheet.create({
  resultsContainer: {
    borderTopWidth: 1.5,
    borderTopColor: colors.primary200,
  },
  foundHereText: {
    color: colors.error,
    fontSize: fontSize.h6,
    fontFamily: fontFamily.inter.bold,
  },
});
