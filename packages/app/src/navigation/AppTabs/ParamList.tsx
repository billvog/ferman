import { NavigationProp, RouteProp } from "@react-navigation/native";

export type AppParamList = {
  Home: undefined;
  Search: undefined;
  CreatePost: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
  navigation: NavigationProp<AppParamList, T>;
  route: RouteProp<AppParamList, T>;
};
