import { NavigationProp, RouteProp } from "@react-navigation/native";

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: NavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
