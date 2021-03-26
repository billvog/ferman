import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export type AppParamList = {
  Feed: undefined;
  Search: undefined;
  MyAccount: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: StackNavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
