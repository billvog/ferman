import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { StdParamList } from "./StdParamList";

export type MyAccountParamList = {
  MyAccount: undefined;
  EditProfile: undefined;
} & StdParamList;

export type MyAccountNavProps<T extends keyof MyAccountParamList> = {
  navigation: StackNavigationProp<MyAccountParamList, T>;
  route: RouteProp<MyAccountParamList, T>;
};
