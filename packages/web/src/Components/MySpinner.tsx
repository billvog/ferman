import SpinnerStyles from "../css/spinner.module.css";
import React from "react";

interface MySpinnerProps {}
export const MySpinner: React.FC<MySpinnerProps> = ({}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className={SpinnerStyles.spinner}></div>
    </div>
  );
};
