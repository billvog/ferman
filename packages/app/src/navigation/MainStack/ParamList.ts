import { NavigationProp, RouteProp } from "@react-navigation/native";

export type MainParamList = {
  Feed: undefined;
  ViewPost: {
    postId: string;
  };
  ViewUserProfile: {
    userId: number;
  };
};

export type MainNavProps<T extends keyof MainParamList> = {
  navigation: NavigationProp<MainParamList, T>;
  route: RouteProp<MainParamList, T>;
};
