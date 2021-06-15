import React from "react";
import { useTranslation } from "react-i18next";

export const WaitI18: React.FC = ({ children }) => {
  const { ready } = useTranslation();
  if (!ready) {
    return null;
  }

  return <>{children}</>;
};
