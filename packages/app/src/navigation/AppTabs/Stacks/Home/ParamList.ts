import { NavigationProp, RouteProp } from "@react-navigation/native";
import { CommonParamList } from "../Common/CommonParamList";

export type HomeParamList = {
  Feed: undefined;
  UserProfile: {
    userId: number;
  };
} & CommonParamList;

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: NavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
