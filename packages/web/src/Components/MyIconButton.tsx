import IconButtonStyles from "../css/icon-button.module.css";
import React, { ButtonHTMLAttributes } from "react";

type MyIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
  isLoading?: boolean;
};

export const MyIconButton: React.FC<MyIconButtonProps> = ({
  icon,
  isLoading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${IconButtonStyles.iconButton} ${
        isLoading ? IconButtonStyles.loading : ""
      }`}
    >
      {icon}
    </button>
  );
};
