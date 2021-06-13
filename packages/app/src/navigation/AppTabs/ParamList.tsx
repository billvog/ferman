import { NavigationProp, RouteProp } from "@react-navigation/native";

export type AppParamList = {
  Feed: undefined;
  Search: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: NavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
