import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { MAIN_DARK_BLUE } from "./Global";

export const HeaderOptions: StackNavigationOptions = {
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "burlywood",
  },
  headerTitleStyle: {
    color: MAIN_DARK_BLUE,
  },
  headerTintColor: MAIN_DARK_BLUE,
};

export const HeaderStyles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: "row",
  },
  HeaderButton: {
    backgroundColor: "brown",
    padding: 8,
    borderRadius: 8,
    marginRight: 7,
  },
  HeaderButtonText: {
    color: "white",
  },
  HeaderSecondaryButton: {
    backgroundColor: "peru",
  },
});
