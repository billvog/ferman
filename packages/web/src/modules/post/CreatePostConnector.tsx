import { PostController } from "@ferman-pkgs/controller";
import React from "react";
import { CreatePostView } from "./CreatePostView";

interface CreatePostConnectorProps {}
export const CreatePostConnector: React.FC<CreatePostConnectorProps> = ({}) => {
  return (
    <PostController>{(props) => <CreatePostView {...props} />}</PostController>
  );
};
