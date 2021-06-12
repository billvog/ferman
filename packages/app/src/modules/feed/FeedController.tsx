import React from "react";
import { SafeAreaView, View } from "react-native";
import { usePostsQuery } from "@ferman-pkgs/controller";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { Post } from "../../components/Post";
import { CenterSpinner } from "../../components/CenterSpinner";
import { useState } from "react";

export const FeedController: React.FC = ({}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: loadMorePosts,
    refetch: refreshPosts,
    variables: postsVariables,
    client,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: 0,
      fromFollowed: true,
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {!postsData && postsLoading && !isRefreshing ? (
        <CenterSpinner />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollViewLoadMore
            isLoading={postsLoading && !isRefreshing}
            isRefreshing={isRefreshing}
            onRefresh={async () => {
              // update state
              setIsRefreshing(true);
              // clear cache from query
              client.cache.evict({
                fieldName: "posts",
              });
              // refetch
              await refreshPosts({
                ...postsVariables,
                skip: 0,
              });
              // update state
              setIsRefreshing(false);
            }}
            onLoadMore={() => {
              loadMorePosts({
                variables: {
                  ...postsVariables,
                  skip: postsData.posts.posts.length,
                },
              });
            }}
            shouldLoadMore={postsData?.posts.hasMore}
            scrollViewProps={{
              style: {
                flex: 1,
              },
            }}
          >
            <View
              style={{
                flexDirection: "column",
              }}
            >
              {postsData?.posts.posts.map((p) => (
                <Post key={`feed:${p.id}`} post={p} />
              ))}
            </View>
          </ScrollViewLoadMore>
        </View>
      )}
    </SafeAreaView>
  );
};
