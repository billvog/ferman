import { FullUserFragment } from "@ferman-pkgs/controller";
import React from "react";
import { isServer } from "../utils/isServer";
import { HeaderController } from "./HeaderController";

interface UserOpenGraphPreviewProps {
  user: FullUserFragment | null | undefined;
}

export const UserOpenGraphPreview: React.FC<UserOpenGraphPreviewProps> = ({
  user,
  children,
}) => {
  if (isServer() && user) {
    return (
      <HeaderController
        title={`${user.username} on Ferman`}
        description={`${user.username}: “${user.profile!.bio}”`}
        author={{ name: user.username, avatar: user.profile!.avatarUrl }}
        additionalKeywords={[user.username, user.uid]}
        type="profile"
      />
    );
  }

  return <>{children}</>;
};