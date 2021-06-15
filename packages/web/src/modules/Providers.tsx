import React from "react";
import { AuthProvider } from "./auth/AuthProvider";

export const Providers: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
