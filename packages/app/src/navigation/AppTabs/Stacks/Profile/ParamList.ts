import { NavigationProp, RouteProp } from "@react-navigation/native";

export type ProfileParamList = {
  Profile: undefined;
};

export type ProfileNavProps<T extends keyof ProfileParamList> = {
  navigation: NavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
