import React from "react";
import { useTranslation } from "react-i18next";
import { MyCenterSpinner } from "./MyCenterSpinner";

export const WaitI18: React.FC = ({ children }) => {
  const { ready } = useTranslation();
  if (!ready) {
    return (
      <div className="w-screen h-screen">
        <MyCenterSpinner />
      </div>
    );
  }

  return <>{children}</>;
};
