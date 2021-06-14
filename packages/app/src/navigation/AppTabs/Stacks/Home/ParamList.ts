import { NavigationProp, RouteProp } from "@react-navigation/native";

export type HomeParamList = {
  Feed: undefined;
  ViewPost: {
    postId: string;
  };
  ViewUserProfile: {
    userId: number;
  };
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: NavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};
