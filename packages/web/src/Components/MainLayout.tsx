import React from "react";
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
    <div className="flex flex-col items-center w-full">
      <div
        className={`relative divide-x ${
          leftSidebar ? "border-l border-r" : ""
        }`}
        style={{
          display: "grid",
          gridTemplateColumns: `${leftSidebar ? "300px" : ""} 612px`,
        }}
      >
        {leftSidebar}
        <div>
          <PageHeader title={title} />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
