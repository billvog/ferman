import IconButtonStyles from "../css/icon-button.module.css";
import React, { ButtonHTMLAttributes } from "react";

type MyIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: JSX.Element;
};

export const MyIconButton: React.FC<MyIconButtonProps> = ({
  icon,
  ...props
}) => {
  return (
    <button {...props} className={IconButtonStyles.iconButton}>
      {icon}
    </button>
  );
};
