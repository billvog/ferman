import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Center } from "../Components/Center";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { Post } from "../Components/Post";
import { useMeQuery, usePostsLazyQuery } from "../generated/graphql";
import { GlobalStyles } from "../Styles/Global";
import { SearchNavProps } from "../Types/SearchParamList";

export const Search = ({ navigation }: SearchNavProps<"Search">) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { data: meData, loading: meLoading } = useMeQuery();
  const [
    runPostsQuery,
    {
      loading: postsLoading,
      data: postsData,
      fetchMore: fetchMorePosts,
      variables: postsVariables,
      called: postsQueryCalled,
    },
  ] = usePostsLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      query: null,
    },
  });

  useEffect(() => {
    if (debouncedQuery.trim() === "") return;

    runPostsQuery({
      variables: {
        ...postsVariables!,
        query: debouncedQuery,
        skip: null,
      },
    });
  }, [debouncedQuery]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 650);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  const handleEndReached = async () => {
    if (postsData?.posts.hasMore) {
      await fetchMorePosts!({
        variables: {
          ...postsVariables,
          skip: postsData?.posts.posts.length,
        },
      });
    }
  };

  return (
    <Layout>
      <View style={{ marginTop: 10 }}>
        {!postsQueryCalled ? (
          <Text style={styles.MessageText}>
            Enter keywords, #hashtags, @mentions to find some posts.
          </Text>
        ) : postsQueryCalled && !postsData?.posts.posts.length ? (
          <Text style={styles.MessageText}>
            No posts matching the given terms.
          </Text>
        ) : postsQueryCalled ? (
          <Text style={styles.MessageText}>
            {postsData?.posts.posts.length} found
          </Text>
        ) : null}
      </View>
      <View style={styles.SearchFieldWrapper}>
        <TextInput
          style={styles.SearchField}
          placeholder="Search terms..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {!postsQueryCalled ? (
        <Center>
          <AntDesign name="search1" size={32} color="lightgrey" />
        </Center>
      ) : postsQueryCalled && postsLoading && !postsData ? (
        <ActivityIndicator color="grey" />
      ) : (postsQueryCalled && !postsData) || !meData ? (
        <ErrorText>Internal server error</ErrorText>
      ) : (
        postsQueryCalled &&
        postsData?.posts.posts && (
          <FlatList
            style={{ marginBottom: 10 }}
            data={postsData.posts.posts}
            keyExtractor={(item) => item.id}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0}
            ListFooterComponent={() =>
              postsLoading ? (
                <ActivityIndicator color="grey" size="large" />
              ) : null
            }
            renderItem={({ item: post }) => (
              <Post
                key={post.id}
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
        )
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  SearchFieldWrapper: {
    marginTop: 5,
    marginBottom: 5,
  },
  SearchField: {
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 12,
    paddingVertical: 6,
    borderRadius: 100 / 2,
    marginBottom: 5,
    fontSize: 13,
    color: "dimgrey",
  },
  MessageText: {
    color: "grey",
    fontSize: 12,
  },
});
