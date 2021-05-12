import { FullUserFragment } from "@ferman-pkgs/controller";
import React from "react";
import { CommonSidebar } from "./CommonSidebar";

interface SidebarLayoutProps {
  loggedUser: FullUserFragment | null | undefined;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  loggedUser,
  children,
}) => {
  return (
    <div
      className="divide-x border-l border-r"
      style={{
        display: "grid",
        gridTemplateColumns: "300px 512px",
      }}
    >
      <div className="sticky top-0 h-screen">
        <CommonSidebar loggedUser={loggedUser} />
      </div>
      <div>{children}</div>
    </div>
  );
};
