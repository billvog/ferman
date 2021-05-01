import ButtonStyles from "../css/button.module.css";
import React, { ButtonHTMLAttributes } from "react";

const sizeClassnames = {
  big: "py-2 px-4 text-sm rounded-lg",
  small: "px-2 py-1 text-sm rounded-md",
  tiny: "px-1 text-sm rounded-5",
};

const colorClassnames = {
  primary:
    "text-button bg-primary-600 hover:bg-primary-300 disabled:text-primary-200 disabled:bg-primary-500",
  accent:
    "text-button bg-accent hover:bg-accent-hover disabled:text-accent-whased-out",
  secondary:
    "text-button bg-secondary hover:bg-secondary-hover disabled:text-secondary-washed-out",
  transparent: "text-button bg-transparent",
};

type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
};

export const MyButton: React.FC<MyButtonProps> = ({
  children,
  isLoading,
  size = "big",
  color = "primary",
  ...props
}) => {
  return (
    <button
      className={`relative select-none border-none rounded-lg ${
        sizeClassnames[size]
      } ${
        colorClassnames[color]
      } transition-all ease-in-out duration-150 cursor-pointer font-semibold focus:outline-none focus:ring-4 focus:ring-${color} ring-opacity-50 ${
        isLoading ? ButtonStyles.loading : ""
      }`}
      {...props}
      disabled={isLoading}
    >
      <span
        className={`flex items-center leading-tight ${
          isLoading ? "opacity-0" : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};
