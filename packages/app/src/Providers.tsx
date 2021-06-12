import { ApolloProvider } from "@apollo/client";
import { MyApolloClient } from "@ferman-pkgs/controller";
import React from "react";

const apolloClient = MyApolloClient(
  "http://localhost:4000",
  "ws://localhost:4000",
  ""
);

export const Providers: React.FC = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
