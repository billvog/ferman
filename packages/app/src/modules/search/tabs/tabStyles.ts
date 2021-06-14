import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSize } from "../../../constants/style";

export const searchTabStyles = StyleSheet.create({
  resultsContainer: {
    borderTopWidth: 1.5,
    borderTopColor: colors.primary200,
  },
  searchTipContainer: {
    margin: 14,
  },
  searchTipText: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.paragraph,
    color: colors.accentWashedOut,
  },
  fieldSubText: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.small,
    color: colors.primary500,
    margin: 10,
  },
  foundNothingText: {
    color: colors.error,
    fontSize: fontSize.h6,
    fontFamily: fontFamily.inter.bold,
  },
});
