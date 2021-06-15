import React from "react";
import { MySpinner } from "./MySpinner";

interface MyCenterSpinnerProps {}
export const MyCenterSpinner: React.FC<MyCenterSpinnerProps> = ({}) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <MySpinner />
    </div>
  );
};
