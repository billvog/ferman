import { ApolloProvider } from "@apollo/client";
import React from "react";
import { ApolloClient } from "./utils/ApolloClient";

export const Providers: React.FC = ({ children }) => {
  return <ApolloProvider client={ApolloClient}>{children}</ApolloProvider>;
};
