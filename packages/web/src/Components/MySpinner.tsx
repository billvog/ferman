import SpinnerStyles from "../css/spinner.module.css";
import React from "react";

interface MySpinnerProps {
  size?: "tiny" | "normal";
}

export const MySpinner: React.FC<MySpinnerProps> = ({ size = "normal" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${SpinnerStyles.spinner} ${SpinnerStyles[size as any]}`}
      />
    </div>
  );
};
