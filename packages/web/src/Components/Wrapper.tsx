import LayoutStyles from "../css/layout.module.css";
import React from "react";

export type WrapperSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface WrapperProps {
  size?: WrapperSize;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, size = "md" }) => {
  let wrapperWidth = 0;
  switch (size) {
    case "sm":
      wrapperWidth = 400;
      break;
    case "md":
      wrapperWidth = 500;
      break;
    case "lg":
      wrapperWidth = 600;
      break;
    case "xl":
      wrapperWidth = 700;
      break;
    case "2xl":
      wrapperWidth = 800;
      break;
    default:
      break;
  }

  return (
    <div
      className={LayoutStyles.wrapper}
      style={{
        maxWidth: wrapperWidth > 0 ? wrapperWidth : undefined,
      }}
    >
      {children}
    </div>
  );
};
