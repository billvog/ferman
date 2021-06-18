import { usePostsQuery } from "@ferman-pkgs/controller";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { MyButton } from "../../../components/MyButton";
import { Post } from "../../../components/Post";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import {
  colors,
  fontFamily,
  fontSize,
  paragraphBold,
  smallBold,
} from "../../../constants/style";
import { HomeNavProps } from "../../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

export const SearchPostsController: React.FC<any> = ({
  route,
  navigation,
}: HomeNavProps<"SearchPosts">) => {
  const { t } = useTypeSafeTranslation();
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!!route.params.query) {
      setQuery(route.params.query);
      navigation.setOptions({
        headerTitle: route.params.query,
      });
    }
  }, [route.params]);

  const {
    loading: postsLoading,
    data: postsData,
    error: postsError,
    fetchMore: loadMorePosts,
    variables: postsVariables,
    called: postsQueryCalled,
    refetch: refreshPosts,
    client,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: query.length <= 0,
    variables: {
      limit: 15,
      skip: 0,
      query,
    },
  });

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
            {t("errors.oops")}
          </Text>
          <MyButton
            color="danger"
            onPress={refreshPostsHandler}
            isLoading={postsLoading}
            size="medium"
          >
            Retry
          </MyButton>
        </View>
      ) : postsQueryCalled ? (
        <View style={{ flex: 1 }}>
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
                <Text
                  style={{
                    ...paragraphBold,
                    textAlign: "center",
                    color: colors.accentHover,
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
                <View
                  style={{
                    padding: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.primary200,
                  }}
                >
                  <Text
                    style={{
                      ...smallBold,
                      color: colors.primary500,
                    }}
                  >
                    {postsData?.posts.count === 1
                      ? t("common.found_one_result").replace(
                          "%seconds%",
                          Number(
                            postsData?.posts.executionTime / 1000
                          ).toString()
                        )
                      : t("common.found_x_results")
                          .replace("%count%", postsData!.posts.count.toString())
                          .replace(
                            "%seconds%",
                            Number(
                              postsData!.posts.executionTime / 1000
                            ).toString()
                          )}
                  </Text>
                </View>
                {postsData?.posts.posts.map((p) => (
                  <Post key={`search-posts:${p.id}`} post={p} />
                ))}
              </View>
            )}
          </ScrollViewLoadMore>
        </View>
      ) : null}
    </View>
  );
};
