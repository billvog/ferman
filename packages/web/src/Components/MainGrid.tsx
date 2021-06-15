import { FullUserFragment } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { useScreenType } from "../shared-hooks/useScreenType";
import { PageHeader } from "./PageHeader";

interface MainGridProps {
  title?: string | JSX.Element;
  leftSidebar?: JSX.Element;
  bottomNav?: JSX.Element;
}

export const MainGrid: React.FC<MainGridProps> = ({
  title = "",
  leftSidebar = null,
  bottomNav = null,
  children,
}) => {
  const { route } = useRouter();
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
        className={`relative w-full h-screen 2cols:w-auto fullscreen:h-auto divide-x ${
          !!leftSidebar ? "1cols:border-l 1cols:border-r" : ""
        } ${screenType === "1-cols" ? "flex-row" : ""}`}
        style={{
          display: screenType === "2-cols" ? "grid" : "flex",
          gridTemplateColumns,
        }}
      >
        {screenType !== "fullscreen" && leftSidebar}
        <div className="flex-1 flex flex-col">
          {!!title && (
            <PageHeader title={title} showBackButton={route !== "/"} />
          )}
          <div className="flex-1">{children}</div>
          {screenType === "fullscreen" && bottomNav}
        </div>
      </div>
    </div>
  );
};
