import { NavigationProp, RouteProp } from "@react-navigation/native";

export type CreatePostParamList = {
  CreatePost: {
    parentPostId?: string;
  };
};

export type CreatePostNavProps<T extends keyof CreatePostParamList> = {
  navigation: NavigationProp<CreatePostParamList, T>;
  route: RouteProp<CreatePostParamList, T>;
};
