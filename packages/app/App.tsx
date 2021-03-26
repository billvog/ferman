import React, { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { Routes } from "./src/Routes";
import { apolloClient } from "./src/Utils/withMyApollo";
import { Root } from "native-base";
import * as Font from "expo-font";

export default () => {
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      });
    })();
  }, []);

  return (
    <Root>
      <ApolloProvider client={apolloClient}>
        <Routes />
      </ApolloProvider>
    </Root>
  );
};
