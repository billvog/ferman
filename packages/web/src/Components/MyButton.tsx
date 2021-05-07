import ButtonStyles from "../css/button.module.css";
import React, { ButtonHTMLAttributes } from "react";

const sizeClassnames = {
  big: "py-2 px-3.5 text-sm rounded-lg",
  small: "px-2 py-1 text-xs rounded-md",
  tiny: "px-1 text-xs rounded-5",
};

const colorClassnames = {
  primary:
    "bg-primary-700 ring-primary-600 hover:bg-primary-600 disabled:text-secondary-200 disabled:bg-primary-500",
  accent:
    "bg-accent ring-accent hover:bg-accent-hover disabled:text-accent-whased-out",
  secondary:
    "bg-secondary-600 ring-secondary-600 hover:bg-secondary-500 disabled:text-secondary-300",
  danger: "bg-red-600 ring-red-600 hover:bg-red-500 disabled:bg-red-500",
  success:
    "bg-green-600 ring-green-600 hover:bg-green-500 disabled:bg-green-500",
  transparent:
    "text-secondary hover:text-secondary-hover disabled:text-secondary-washed-out bg-transparent",
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
  color = "secondary",
  square = false,
  ...props
}) => {
  return (
    <button
      className={`relative flex justify-center items-center text-button select-none border-none rounded-lg ${
        square ? "w-9 h-9 rounded-xl" : sizeClassnames[size]
      } ${
        colorClassnames[color]
      } transition-all ease-in-out duration-150 cursor-pointer font-semibold focus:ring-2 ring-offset-2 ring-transparent ${
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
