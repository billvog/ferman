import { PostController } from "@ferman/controller";
import React from "react";
import { CreatePostView } from "../views/CreatePostView";

interface CreatePostConnectorProps {}
export const CreatePostConnector: React.FC<CreatePostConnectorProps> = ({}) => {
  return (
    <PostController>{(props) => <CreatePostView {...props} />}</PostController>
  );
};
