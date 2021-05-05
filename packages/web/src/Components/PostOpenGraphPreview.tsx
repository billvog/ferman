import { FullPostFragment } from "@ferman-pkgs/controller";
import React from "react";
import { isServer } from "../utils/isServer";
import { HeaderController } from "./HeaderController";

interface PostOpenGraphPreviewProps {
  post: FullPostFragment | null | undefined;
}

export const PostOpenGraphPreview: React.FC<PostOpenGraphPreviewProps> = ({
  post,
  children,
}) => {
  if (isServer() && post) {
    return (
      <HeaderController
        title={`${post.creator.username} on Ferman`}
        description={post.body}
        author={{
          name: post.creator.username,
          avatar: post.creator.profile?.avatarUrl || "",
        }}
        additionalKeywords={[post.creator.username, post.creator.uid]}
        type="article"
      />
    );
  }

  return <>{children}</>;
};
