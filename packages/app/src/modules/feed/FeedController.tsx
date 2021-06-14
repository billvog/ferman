import { usePostsQuery } from "@ferman-pkgs/controller";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../components/CenterSpinner";
import { MyButton } from "../../components/MyButton";
import { Post } from "../../components/Post";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const FeedController: React.FC = ({}) => {
  const { t } = useTypeSafeTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: postsData,
    error: postsError,
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
    <View
      style={{
        flex: 1,
      }}
    >
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
            style="danger"
            onPress={refreshPostsHandler}
            title="Retry"
            isLoading={postsLoading}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollViewLoadMore
            isLoading={postsLoading && !isRefreshing}
            isRefreshing={isRefreshing}
            onRefresh={refreshPostsHandler}
            onLoadMore={() => {
              loadMorePosts({
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
                  marginTop: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.primary500,
                    fontSize: fontSize.h5,
                    fontFamily: fontFamily.inter.medium,
                  }}
                >
                  {t("common.no_posts")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                {postsData?.posts.posts.map((p) => (
                  <Post key={`feed:${p.id}`} post={p} />
                ))}
              </View>
            )}
          </ScrollViewLoadMore>
        </View>
      )}
    </View>
  );
};
