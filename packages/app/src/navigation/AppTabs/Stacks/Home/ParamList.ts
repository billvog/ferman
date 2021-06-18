import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ChatParamList } from "../Chat/ParamList";
import { CommonParamList } from "../Common/CommonParamList";

export type HomeParamList = {
  Feed: undefined;
} & CommonParamList;

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: NavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
