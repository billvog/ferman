import React from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { Center } from "./Components/Center";
import { ErrorText } from "./Components/ErrorText";
import { useMeQuery } from "./generated/graphql";
import { AppTabs } from "./Stacks/AppTabs";
import { AuthStack } from "./Stacks/Authentication";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery();

  return (
    <>
      {meLoading ? (
        <ActivityIndicator color="grey" />
      ) : !meData ? (
        <ErrorText>Internal server error</ErrorText>
      ) : meData.me ? (
        <AppTabs />
      ) : (
        <AuthStack />
      )}
    </>
  );
};
