import { NavigationProp, RouteProp } from "@react-navigation/native";
import { CommonParamList } from "../Common/CommonParamList";

export type ProfileParamList = {
  Profile: undefined;
} & CommonParamList;

export type ProfileNavProps<T extends keyof ProfileParamList> = {
  navigation: NavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
