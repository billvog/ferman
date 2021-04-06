import ButtonStyles from "../css/button.module.css";
import React, { ButtonHTMLAttributes } from "react";

type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  colorScheme?: "normal" | "grey" | "success" | "error";
};

export const MyButton: React.FC<MyButtonProps> = ({
  isLoading,
  children,
  colorScheme = "normal",
  ...props
}) => {
  return (
    <button
      className={`${ButtonStyles.button} ${
        isLoading ? ButtonStyles.loading : ""
      } ${
        typeof colorScheme !== "undefined"
          ? ButtonStyles[colorScheme as any]
          : ""
      }`}
      {...props}
      disabled={isLoading}
    >
      <span className={ButtonStyles.content}>{children}</span>
    </button>
  );
};
