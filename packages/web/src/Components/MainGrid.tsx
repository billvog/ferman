import React from "react";
import { useScreenType } from "../shared-hooks/useScreenType";
import { MySpinner } from "./MySpinner";
import { PageHeader } from "./PageHeader";

interface MainGridProps {
  title?: string;
  leftSidebar?: JSX.Element;
  bottomNav?: JSX.Element;
}

export const MainGrid: React.FC<MainGridProps> = ({
  title = "",
  leftSidebar = null,
  bottomNav = null,
  children,
}) => {
  const screenType = useScreenType();

  let gridTemplateColumns = `${leftSidebar ? "300px" : ""} 612px`;
  if (screenType === "1-cols") {
    gridTemplateColumns = ``;
  }

  return (
    <div
      id="main"
      className="relative flex flex-col items-center w-full h-screen"
    >
      <div
        className={`relative w-full 2cols:w-auto h-screen divide-x ${
          leftSidebar ? "1cols:border-l 1cols:border-r" : ""
        } ${screenType === "1-cols" ? "flex-row" : ""}`}
        style={{
          display: screenType === "2-cols" ? "grid" : "flex",
          gridTemplateColumns,
        }}
      >
        {screenType !== "fullscreen" && leftSidebar}
        <div className="flex-1 flex flex-col">
          <PageHeader title={title} />
          <div className="p-4 flex-1">{children}</div>
          {screenType === "fullscreen" && bottomNav}
        </div>
      </div>
    </div>
  );
};
