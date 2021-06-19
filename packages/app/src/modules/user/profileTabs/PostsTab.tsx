import { FullUserFragment, usePostsQuery } from "@ferman-pkgs/controller";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { MyButton } from "../../../components/MyButton";
import { Post } from "../../../components/Post";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { userProfileTabStyles } from "./tabStyles";
import { HScrollView } from "react-native-head-tab-view";
import { useEffect } from "react";
import { isCloseToBottom } from "../../../utils/ScrollView";

interface PostsTabProps {
  index: number;
  user: FullUserFragment | null;
  tab: "posts" | "replies" | "likes";
  tabIsRefreshing: boolean;
  stopRefreshing: () => void;
}

export const PostsTab: React.FC<PostsTabProps> = ({
  index,
  user,
  tab,
  tabIsRefreshing,
  stopRefreshing,
}) => {
  const { t } = useTypeSafeTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!user) {
    return <CenterSpinner />;
  }

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
    variables: {
      limit: 3,
      skip: 0,
      isReply: tab === "replies",
      likedBy: tab === "likes" ? user.id : undefined,
      userId: tab === "posts" || tab === "replies" ? user.id : undefined,
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

  useEffect(() => {
    (async () => {
      if (tabIsRefreshing) {
        await refreshPostsHandler();
        stopRefreshing();
      }
    })();
  }, [tabIsRefreshing]);

  return (
    <HScrollView
      index={index}
      // onScroll={({ nativeEvent }) => {
      //   if (isCloseToBottom(nativeEvent) && postsData?.posts.hasMore) {
      //     loadMorePosts?.({
      //       variables: {
      //         ...postsVariables,
      //         skip: postsData?.posts.posts.length,
      //       },
      //     });
      //   }
      // }}
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
            color="danger"
            onPress={refreshPostsHandler}
            isLoading={postsLoading}
          >
            Retry
          </MyButton>
        </View>
      ) : postsQueryCalled ? (
        <View style={[userProfileTabStyles.resultsContainer, { flex: 1 }]}>
          {postsData?.posts.count === 0 ? (
            <View
              style={{
                padding: 14,
              }}
            >
              <Text style={userProfileTabStyles.foundHereText}>
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
        </View>
      ) : null}
    </HScrollView>
  );
};
