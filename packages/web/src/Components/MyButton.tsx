import ButtonStyles from "../css/button.module.css";
import React, { ButtonHTMLAttributes } from "react";

type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export const MyButton: React.FC<MyButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <button className={ButtonStyles.button} {...props}>
      {children}
    </button>
  );
};
