import { usePostsLazyQuery } from "@ferman-pkgs/controller";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { fieldStyle } from "../../../components/InputField";
import { MyButton } from "../../../components/MyButton";
import { Post } from "../../../components/Post";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { SearchTips } from "../SearchTips";
import { searchTabStyles as tabStyles } from "./tabStyles";

export const PostsTab: React.FC = () => {
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
    client?.cache.evict({
      fieldName: "posts",
    });
    // refetch
    await refreshPosts?.({
      ...postsVariables,
      skip: 0,
    });
    // update state
    setIsRefreshing(false);
  };

  return (
    <View
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
          <View style={tabStyles.searchTipContainer}>
            <Text style={tabStyles.searchTipText}>
              {t("search.search_posts_field_subtext")}
            </Text>
            <SearchTips />
          </View>
        ) : postsData && postsData.posts.count > 0 ? (
          <Text style={tabStyles.fieldSubText}>
            {postsData?.posts.count === 1
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
        ) : null}
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
              fontFamily: fontFamily.inter.medium,
              marginBottom: 16,
            }}
          >
            {t("errors.500")}
          </Text>
          <MyButton
            color="danger"
            onPress={refreshPostsHandler}
            isLoading={postsLoading}
          >
            Retry
          </MyButton>
        </View>
      ) : postsQueryCalled ? (
        <View style={[tabStyles.resultsContainer, { flex: 1 }]}>
          <ScrollViewLoadMore
            isLoading={postsLoading && !isRefreshing}
            isRefreshing={isRefreshing}
            onRefresh={refreshPostsHandler}
            onLoadMore={() => {
              loadMorePosts?.({
                variables: {
                  ...postsVariables,
                  skip: postsData?.posts.posts.length,
                },
              });
            }}
            shouldLoadMore={postsData?.posts.hasMore || false}
            scrollViewProps={{
              style: {
                flex: 1,
              },
            }}
          >
            {postsData?.posts.count === 0 ? (
              <View
                style={{
                  padding: 14,
                }}
              >
                <Text style={tabStyles.foundNothingText}>
                  {t("search.found_nothing")}
                </Text>
                <SearchTips />
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
    </View>
  );
};
