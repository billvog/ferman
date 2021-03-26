import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { StdParamList } from "./StdParamList";

export type SearchParamList = {
  Search: undefined;
} & StdParamList;

export type SearchNavProps<T extends keyof SearchParamList> = {
  navigation: StackNavigationProp<SearchParamList, T>;
  route: RouteProp<SearchParamList, T>;
};
