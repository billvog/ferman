import { NavigationProp, RouteProp } from "@react-navigation/native";
import { CommonParamList } from "../Common/CommonParamList";

export type SearchParamList = {
  Search: undefined;
} & CommonParamList;

export type SearchNavProps<T extends keyof SearchParamList> = {
  navigation: NavigationProp<SearchParamList, T>;
  route: RouteProp<SearchParamList, T>;
};
