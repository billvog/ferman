import React from "react";
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  View,
} from "react-native";
import { isCloseToBottom } from "../utils/ScrollView";
import { Spinner } from "./Spinner";

export type ScrollViewLoadMoreProps = {
  scrollViewProps?: ScrollViewProps;
  shouldLoadMore: boolean;
  isLoading: boolean;
  isRefreshing?: boolean;
  onLoadMore: () => void;
  onRefresh?: () => void;
};

export const ScrollViewLoadMore: React.FC<ScrollViewLoadMoreProps> = ({
  children,
  scrollViewProps,
  shouldLoadMore,
  isLoading,
  isRefreshing,
  onLoadMore,
  onRefresh,
}) => {
  return (
    <ScrollView
      {...scrollViewProps}
      scrollEventThrottle={400}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && shouldLoadMore) {
          onLoadMore();
        }
      }}
      refreshControl={
        <RefreshControl
          enabled={typeof onRefresh === "function"}
          refreshing={isRefreshing || false}
          onRefresh={onRefresh}
        />
      }
    >
      {children}
      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
          children={<Spinner size="s" />}
        />
      )}
    </ScrollView>
  );
};
