import React from "react";
import { VscError } from "react-icons/vsc";

interface ErrorTextProps {}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-full flex justify-center items-center bg-red-100 py-4 px-6 text-red-600 text-center font-bold text-base">
        <div className="mr-2 leading-none">
          <VscError />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
