import { StyleSheet } from "react-native";
import { colors, paragraphBold } from "../constants/style";
export const actionModalStyles = StyleSheet.create({
  container: {},
  actionItem: {
    backgroundColor: colors.primary100,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionItemNotFirst: {
    borderTopWidth: 1,
    borderTopColor: colors.primary200,
  },
  actionItemIcon: {
    marginRight: 12,
  },
  actionItemText: {
    ...paragraphBold,
  },
});
