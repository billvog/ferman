import React from "react";
import { RefreshControl, ScrollViewProps, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Spinner } from "./Spinner";

export type ScrollViewLoadMoreProps = {
  scrollViewProps?: ScrollViewProps;
  shouldLoadMore: boolean;
  canRefresh?: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  onLoadMore: () => void;
  onRefresh: () => void;
};

const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export const ScrollViewLoadMore: React.FC<ScrollViewLoadMoreProps> = ({
  children,
  scrollViewProps,
  shouldLoadMore,
  canRefresh,
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
        canRefresh ? (
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        ) : null
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
