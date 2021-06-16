import React from "react";
import { useRef } from "react";
import { RefreshControl, ScrollViewProps, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Spinner } from "./Spinner";

export type ScrollViewLoadMoreProps = {
  isReversed?: boolean;
  keepScrollToBottom?: boolean;
  scrollViewProps?: ScrollViewProps;
  shouldLoadMore: boolean;
  isLoading: boolean;
  isRefreshing?: boolean;
  onLoadMore: () => void;
  onRefresh?: () => void;
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

const isCloseToTop = ({ _, contentOffset, __ }: any) => {
  return contentOffset.y === 0;
};

export const ScrollViewLoadMore: React.FC<ScrollViewLoadMoreProps> = ({
  children,
  keepScrollToBottom = false,
  isReversed = false,
  scrollViewProps,
  shouldLoadMore,
  isLoading,
  isRefreshing,
  onLoadMore,
  onRefresh,
}) => {
  const scrollViewRef = useRef<any>();
  return (
    <ScrollView
      {...scrollViewProps}
      ref={scrollViewRef}
      onContentSizeChange={
        keepScrollToBottom
          ? () => scrollViewRef.current?.scrollToEnd({ animated: true })
          : undefined
      }
      scrollEventThrottle={400}
      onScroll={({ nativeEvent }) => {
        if (isReversed && isCloseToTop(nativeEvent) && shouldLoadMore) {
          onLoadMore();
        } else if (
          !isReversed &&
          isCloseToBottom(nativeEvent) &&
          shouldLoadMore
        ) {
          onLoadMore();
        }
      }}
      refreshControl={
        typeof onRefresh === "function" ? (
          <RefreshControl
            refreshing={isRefreshing || false}
            onRefresh={onRefresh}
          />
        ) : undefined
      }
    >
      {!isReversed ? children : null}
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
      {isReversed ? children : null}
    </ScrollView>
  );
};
