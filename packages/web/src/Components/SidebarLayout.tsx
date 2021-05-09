import { FullUserFragment } from "@ferman-pkgs/controller";
import React from "react";
import { CommonSidebar } from "./CommonSidebar";

interface SidebarLayoutProps {
  loggedUser: FullUserFragment | null;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  loggedUser,
  children,
}) => {
  return (
    <div
      className="divide-x divide-primary-300"
      style={{
        display: "grid",
        gridTemplateColumns: "300px 512px",
      }}
    >
      <div>
        <CommonSidebar loggedUser={loggedUser} />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};
