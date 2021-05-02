import React from "react";

const colorClassnames = {
  success: "text-white bg-green-400",
  error: "text-white bg-red-400",
};

interface MyAlertProps {
  color: keyof typeof colorClassnames;
}

export const MyAlert: React.FC<MyAlertProps> = ({
  children,
  color = "success",
}) => {
  return (
    <div
      className={`flex flex-row items-center font-bold text-sm px-4 py-3 rounded-xl leading-snug ${colorClassnames[color]}`}
    >
      <div>{children}</div>
    </div>
  );
};
