import { NavigationProp, RouteProp } from "@react-navigation/native";

export type SearchParamList = {
  Search: undefined;
};

export type SearchNavProps<T extends keyof SearchParamList> = {
  navigation: NavigationProp<SearchParamList, T>;
  route: RouteProp<SearchParamList, T>;
};
