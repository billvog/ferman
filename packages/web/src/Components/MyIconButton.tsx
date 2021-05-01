import IconButtonStyles from "../css/icon-button.module.css";
import React, { ButtonHTMLAttributes } from "react";

type MyIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
  isLoading?: boolean;
};

export const MyIconButton: React.FC<MyIconButtonProps> = ({
  icon,
  isLoading,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`flex justify-center items-center w-9 h-9 border-none outline-none bg-yellow-800 text-white rounded-xl cursor-pointer leading-tight transition-all ease-in-out duration-100 focus:ring-4 focus:ring-yellow-800 focus:ring-opacity-25 focus:outline-none  ${
        isLoading ? IconButtonStyles.loading : ""
      } ${className}`}
    >
      {icon}
    </button>
  );
};
