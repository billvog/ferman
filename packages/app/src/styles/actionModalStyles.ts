import { StyleSheet } from "react-native";
import { colors, paragraphBold } from "../constants/style";
export const actionModalStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 12,
  },
  actionItem: {
    backgroundColor: colors.primary100,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionItemIcon: {
    marginRight: 12,
  },
  actionItemText: {
    ...paragraphBold,
  },
});
