import { NavigationProp, RouteProp } from "@react-navigation/native";
import { CommonParamList } from "../Common/CommonParamList";
import { SettingsParamList } from "../Settings/ParamList";

export type ProfileParamList = {
  Profile: undefined;
  Settings: undefined;
} & CommonParamList &
  SettingsParamList;

export type ProfileNavProps<T extends keyof ProfileParamList> = {
  navigation: NavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};
