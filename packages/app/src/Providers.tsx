import { ApolloProvider } from "@apollo/client";
import React from "react";
import { AuthProvider } from "./modules/auth/AuthProvider";
import { ApolloClient } from "./utils/ApolloClient";

export const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={ApolloClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};
