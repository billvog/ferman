import React from "react";
import { useTranslation } from "react-i18next";
import { MySpinner } from "./MySpinner";

export const WaitI18: React.FC = ({ children }) => {
  const { ready } = useTranslation();
  if (!ready) {
    return <MySpinner />;
  }

  return <>{children}</>;
};
