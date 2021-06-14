import React from "react";
import { CreatePostController } from "@ferman-pkgs/controller";
import { CreatePostView } from "./CreatePostView";
import { useNavigation } from "@react-navigation/native";
import { CreatePostNavProps } from "../../../navigation/AppTabs/Stacks/CreatePost/ParamList";

export const CreatePostConnector: React.FC<any> = ({
  route,
}: CreatePostNavProps<"CreatePost">) => {
  const navigation = useNavigation();

  const onFinish = (postId: string) => {
    navigation.navigate("ViewPost", {
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
