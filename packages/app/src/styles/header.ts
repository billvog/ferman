import { StackNavigationOptions } from "@react-navigation/stack";
import { colors, fontFamily, fontSize } from "../constants/style";

export const headerOptions: StackNavigationOptions = {
  headerTintColor: colors.primary600,
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: fontSize.h5,
    fontFamily: fontFamily.inter.bold,
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
};
