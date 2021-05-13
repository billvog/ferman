import { FullCommentFragment } from "@ferman-pkgs/controller";
import React from "react";
import { isServer } from "../../../utils/isServer";
import { HeaderController } from "../../display/HeaderController";

interface CommentOpenGraphPreviewProps {
  comment: FullCommentFragment | null | undefined;
}

export const CommentOpenGraphPreview: React.FC<CommentOpenGraphPreviewProps> = ({
  comment,
  children,
}) => {
  if (isServer() && comment) {
    return (
      <HeaderController
        title={`${comment.user.username} comments on Ferman`}
        description={comment.text}
        author={{
          name: comment.user.username,
          avatar: comment.user.profile?.avatarUrl || "",
        }}
        additionalKeywords={[comment.user.username, comment.user.uid]}
        type="comment"
      />
    );
  }

  return <>{children}</>;
};
