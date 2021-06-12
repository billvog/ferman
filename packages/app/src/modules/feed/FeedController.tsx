import React from "react";
import { SafeAreaView, View } from "react-native";
import { usePostsQuery } from "@ferman-pkgs/controller";
import { FullSpinner } from "../../components/FullSpinner";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { Post } from "../../components/Post";

export const FeedController: React.FC = ({}) => {
  const { data: postsData, loading: postsLoading } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: 0,
      fromFollowed: true,
    },
  });

  return (
    <SafeAreaView>
      {!postsData && postsLoading ? (
        <FullSpinner />
      ) : (
        <View>
          <ScrollViewLoadMore
            isLoading={postsLoading}
            onLoadMore={() => {}}
            shouldLoadMore={postsData.posts.hasMore}
            scrollViewProps={{}}
          >
            <View
              style={{
                flexDirection: "column",
              }}
            >
              {postsData.posts.posts.map((p) => (
                <Post key={p.id} post={p} />
              ))}
            </View>
          </ScrollViewLoadMore>
        </View>
      )}
    </SafeAreaView>
  );
};
