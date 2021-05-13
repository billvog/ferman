import { FullUserFragment } from "@ferman-pkgs/controller";
import React from "react";
import { CommonSidebar } from "./CommonSidebar";
import { PageHeader } from "./PageHeader";

interface MainLayoutProps {
  title?: string;
  leftSidebar?: JSX.Element;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  title = "",
  leftSidebar = null,
  children,
}) => {
  return (
    <div className="flex justify-center">
      <div
        className="h-screen divide-x border-l border-r"
        style={{
          display: "grid",
          gridTemplateColumns: `${leftSidebar ? "300px" : ""} 512px`,
        }}
      >
        {leftSidebar && <div className="sticky top-0">{leftSidebar}</div>}
        <div>
          <PageHeader title={title} />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
