import { NavigationProp, RouteProp } from "@react-navigation/native";

export type FeedParamList = {
  Feed: undefined;
  ViewPost: {
    postId: string;
  };
  ViewUserProfile: {
    userId: number;
  };
};

export type FeedNavProps<T extends keyof FeedParamList> = {
  navigation: NavigationProp<FeedParamList, T>;
  route: RouteProp<FeedParamList, T>;
};
