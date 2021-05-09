import LayoutStyles from "../css/layout.module.css";
import React from "react";

export type WrapperSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

interface WrapperProps {
  size?: WrapperSize;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, size }) => {
  return (
    <div className={`${LayoutStyles.wrapper} max-w-${size}`}>{children}</div>
  );
};
