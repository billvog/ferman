import ButtonStyles from "../css/button.module.css";
import React, { ButtonHTMLAttributes } from "react";

const sizeClassnames = {
  big: "py-2 px-3.5 text-sm rounded-lg",
  small: "px-2 py-1 text-xs rounded-md",
  tiny: "px-1 text-xs rounded-5",
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
  square?: boolean;
};

export const MyButton: React.FC<MyButtonProps> = ({
  children,
  isLoading,
  size = "big",
  color = "primary",
  square = false,
  ...props
}) => {
  return (
    <button
      className={`relative flex justify-center items-center select-none border-none rounded-lg ${
        square ? "w-9 h-9 rounded-xl" : sizeClassnames[size]
      } ${
        colorClassnames[color]
      } transition-all ease-in-out duration-150 cursor-pointer font-semibold focus:outline-none focus:ring-2 ring-${color} ring-offset-2 ring-transparent ${
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
