import { useApolloClient } from "@apollo/client";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { Loading } from "../Components/Loading";
import { Post } from "../Components/Post";
import { UserCard } from "../Components/UserCard";
import { useMeQuery, usePostsQuery, useUserQuery } from "../generated/graphql";
import { GlobalStyles, MAIN_DARK_BLUE } from "../Styles/Global";
import { FeedNavProps } from "../Types/FeedParamList";

export const ViewUser = ({ navigation, route }: FeedNavProps<"User">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: userData,
    loading: userLoading,
    refetch: refetchUser,
  } = useUserQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: route.params.userId,
    },
  });

  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: fetchMorePosts,
    refetch: refetchPosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: !userData?.user?.id,
    variables: {
      limit: 10,
      skip: null,
      userId: userData?.user?.id,
    },
  });

  React.useLayoutEffect(() => {
    if (userData?.user) {
      navigation.setOptions({
        headerTitle: userData.user.username,
      });
    }
  }, [navigation, userData?.user?.username]);

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
      {meLoading || userLoading || (postsLoading && !postsData) ? (
        <Loading />
      ) : !userData?.user ? (
        <ErrorText>User not found</ErrorText>
      ) : !meData || !meData.me || !userData || !postsData ? (
        <Text>Internal server error</Text>
      ) : (
        <>
          <View>
            <FlatList
              style={GlobalStyles.Container}
              refreshControl={
                <RefreshControl
                  refreshing={postsLoading && userLoading}
                  onRefresh={async () => {
                    apolloClient.cache.evict({
                      id: "User:" + userData.user?.id,
                    });
                    apolloClient.cache.evict({ fieldName: "posts" });
                    await refetchUser();
                    await refetchPosts({
                      ...postsVariables,
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
                  <ActivityIndicator color="grey" size="large" />
                ) : null
              }
              ListHeaderComponent={() => (
                <>
                  <UserCard me={meData.me!} user={userData.user!} full />
                  <Text style={styles.Header}>
                    <Text style={{ fontWeight: "600" }}>
                      {userData.user!.username}
                    </Text>
                    {postsData.posts.posts.length > 0
                      ? "'s posts"
                      : " has no posts"}
                  </Text>
                </>
              )}
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
          </View>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  Header: {
    marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
    color: MAIN_DARK_BLUE,
  },
});
