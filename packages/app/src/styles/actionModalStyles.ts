import { StyleSheet } from "react-native";
import { paragraphBold } from "../constants/style";
export const actionModalStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 18,
  },
  actionItem: {
    padding: 14,
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
