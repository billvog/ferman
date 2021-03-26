import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { StdParamList } from "./StdParamList";

export type FeedParamList = {
  Feed: undefined;
} & StdParamList;

export type FeedNavProps<T extends keyof FeedParamList> = {
  navigation: StackNavigationProp<FeedParamList, T>;
  route: RouteProp<FeedParamList, T>;
};
