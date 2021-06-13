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
