import { CreatePostController } from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { CreatePostNavProps } from "../../../navigation/AppTabs/Stacks/CreatePost/ParamList";
import { HomeParamList } from "../../../navigation/AppTabs/Stacks/Home/ParamList";
import { CreatePostView } from "./CreatePostView";

export const CreatePostConnector: React.FC<any> = ({
  route,
}: CreatePostNavProps<"CreatePost">) => {
  const navigation = useNavigation<StackNavigationProp<HomeParamList>>();

  const onFinish = (postId: string) => {
    navigation.replace("ViewPost", {
      postId,
    });
  };

  return (
    <CreatePostController
      parentPostId={route.params?.parentPostId}
      onFinish={onFinish}
    >
      {(props) => (
        <CreatePostView
          isReply={typeof route.params?.parentPostId === "string"}
          {...props}
        />
      )}
    </CreatePostController>
  );
};
