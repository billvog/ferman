import React from "react";
import { VscError } from "react-icons/vsc";

interface ErrorTextProps {}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
    <div className="grid justify-center content-center">
      <div className="flex items-center bg-gray-100 rounded-md p-3 py-6 text-red-500 text-center font-bold text-md">
        <div className="mr-2 leading-none">
          <VscError />
        </div>
        {children}
      </div>
    </div>
  );
};
