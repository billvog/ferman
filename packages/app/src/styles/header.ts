import { StackNavigationOptions } from "@react-navigation/stack";
import { colors, fontFamily } from "../constants/style";

export const headerOptions: StackNavigationOptions = {
  headerTintColor: colors.primary600,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: fontFamily.inter.bold,
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
};
