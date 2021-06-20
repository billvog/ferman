import { StyleSheet } from "react-native";
import { colors, h6 } from "../../../constants/style";

export const userProfileTabStyles = StyleSheet.create({
  resultsContainer: {
    borderTopWidth: 1.5,
    borderTopColor: colors.primary200,
  },
  foundHereText: {
    ...h6,
    padding: 14,
    textAlign: "center",
    color: colors.error,
  },
});
