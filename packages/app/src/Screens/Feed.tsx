import { useApolloClient } from "@apollo/client";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Layout } from "../Components/Layout";
import { Loading } from "../Components/Loading";
import { Post } from "../Components/Post";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { GlobalStyles } from "../Styles/Global";
import { FeedNavProps } from "../Types/FeedParamList";

export const Feed = ({ navigation, route }: FeedNavProps<"Feed">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    loading: postsLoading,
    data: postsData,
    fetchMore: fetchMorePosts,
    refetch: refetchPosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 10,
      skip: null,
      query: null,
    },
  });

  const handleEndReached = async () => {
    if (postsData?.posts.hasMore) {
      await fetchMorePosts({
        variables: {
          ...postsVariables,
          skip: postsData?.posts.posts.length,
        },
      });
    }
  };

  return (
    <Layout>
      {meLoading || (postsLoading && !postsData) ? (
        <Loading />
      ) : !meData || !meData.me || !postsData ? (
        <Text style={{ color: "red" }}>Internal server error</Text>
      ) : (
        <FlatList
          style={GlobalStyles.Container}
          refreshControl={
            <RefreshControl
              refreshing={postsLoading}
              onRefresh={async () => {
                apolloClient.cache.evict({ fieldName: "posts" });
                refetchPosts({
                  ...postsVariables!,
                  skip: null,
                });
              }}
            />
          }
          data={postsData.posts.posts}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            postsLoading ? (
              <ActivityIndicator color="grey" style={{ marginBottom: 5 }} />
            ) : (
              <View style={{ margin: 3 }} />
            )
          }
          renderItem={({ item: post }) => (
            <Post
              post={post}
              me={meData.me!}
              onPress={() => {
                navigation.navigate("Post", {
                  postId: post.id,
                });
              }}
            />
          )}
        />
      )}
    </Layout>
  );
};
