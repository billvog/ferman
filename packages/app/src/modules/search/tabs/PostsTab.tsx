import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { usePostsLazyQuery, useUsersLazyQuery } from "@ferman-pkgs/controller";
import { Text } from "react-native";
import { Post } from "../../../components/Post";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { MyButton } from "../../../components/MyButton";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { TextInput } from "react-native-gesture-handler";
import { fieldStyle } from "../../../components/InputField";

interface PostsTabProps {}
export const PostsTab: React.FC<PostsTabProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [
    runPostsQuery,
    {
      loading: postsLoading,
      data: postsData,
      error: postsError,
      fetchMore: loadMorePosts,
      variables: postsVariables,
      called: postsQueryCalled,
      refetch: refreshPosts,
      client,
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
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      return runPostsQuery({
        variables: {
          ...postsVariables!,
          query: debouncedQuery,
          skip: null,
        },
      });
    }
  }, [debouncedQuery]);

  const refreshPostsHandler = async () => {
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
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View>
        <TextInput
          placeholder={t("search.search_field_placeholder")}
          value={query}
          onChangeText={setQuery}
          style={[
            fieldStyle,
            {
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 0,
            },
          ]}
        />
        {!postsQueryCalled ? (
          <View style={styles.searchTipContainer}>
            <Text style={styles.searchTipText}>
              {t("search.search_posts_field_subtext")}
            </Text>
          </View>
        ) : (
          <Text style={styles.fieldSubText}>
            {postsData.posts.count === 1
              ? t("common.found_one_result").replace(
                  "%seconds%",
                  Number(postsData?.posts.executionTime / 1000).toString()
                )
              : t("common.found_x_results")
                  .replace("%count%", postsData?.posts.count.toString())
                  .replace(
                    "%seconds%",
                    Number(postsData?.posts.executionTime / 1000).toString()
                  )}
          </Text>
        )}
      </View>
      {!postsData && postsLoading && !isRefreshing ? (
        <CenterSpinner />
      ) : !postsData && postsError ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.error,
              fontSize: fontSize.h5,
              fontFamily: fontFamily.roboto.medium,
              marginBottom: 16,
            }}
          >
            {t("errors.500")}
          </Text>
          <MyButton
            style="danger"
            onPress={refreshPostsHandler}
            title="Retry"
            isLoading={postsLoading}
          />
        </View>
      ) : postsQueryCalled ? (
        <View style={[styles.postsContainer, { flex: 1 }]}>
          <ScrollViewLoadMore
            isLoading={postsLoading && !isRefreshing}
            isRefreshing={isRefreshing}
            onRefresh={refreshPostsHandler}
            onLoadMore={() => {
              loadMorePosts({
                variables: {
                  ...postsVariables,
                  skip: postsData.posts.posts.length,
                },
              });
            }}
            shouldLoadMore={postsData?.posts.hasMore}
            canRefresh={postsQueryCalled}
            scrollViewProps={{
              style: {
                flex: 1,
              },
            }}
          >
            {postsData?.posts.count === 0 ? (
              <View
                style={{
                  marginTop: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.primary500,
                    fontSize: fontSize.h5,
                    fontFamily: fontFamily.roboto.medium,
                  }}
                >
                  {t("search.found_nothing")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                {postsData?.posts.posts.map((p) => (
                  <Post key={`search:${p.id}`} post={p} />
                ))}
              </View>
            )}
          </ScrollViewLoadMore>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    borderTopWidth: 1.5,
    borderTopColor: colors.primary200,
  },
  searchTipContainer: {
    margin: 14,
  },
  searchTipText: {
    fontFamily: fontFamily.roboto.medium,
    fontSize: fontSize.paragraph,
    color: colors.accentWashedOut,
  },
  fieldSubText: {
    fontFamily: fontFamily.roboto.medium,
    fontSize: fontSize.small,
    color: colors.primary500,
    margin: 10,
  },
});
