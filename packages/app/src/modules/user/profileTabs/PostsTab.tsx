import { FullUserFragment, usePostsQuery } from "@ferman-pkgs/controller";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HFlatList, HScrollView } from "react-native-head-tab-view";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { MyButton } from "../../../components/MyButton";
import { Post } from "../../../components/Post";
import { Spinner } from "../../../components/Spinner";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { userProfileTabStyles } from "./tabStyles";

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
    refetch: refreshPosts,
    client,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 10,
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
            color="danger"
            onPress={refreshPostsHandler}
            isLoading={postsLoading}
          >
            Retry
          </MyButton>
        </View>
      ) : (
        <View style={[userProfileTabStyles.resultsContainer, { flex: 1 }]}>
          {postsData?.posts.count === 0 ? (
            <HScrollView index={index}>
              <Text style={userProfileTabStyles.foundHereText}>
                {t(
                  tab === "posts"
                    ? "user.no_posts"
                    : tab === "replies"
                    ? "user.no_replies"
                    : "user.no_liked_posts"
                ).replace("%user%", user.username)}
              </Text>
            </HScrollView>
          ) : (
            <HFlatList
              index={index}
              data={postsData?.posts.posts}
              renderItem={({ item: p }) => <Post post={p} />}
              keyExtractor={(item) => `user-profile:${item.id}`}
              ListHeaderComponent={() => null}
              ListFooterComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 32,
                  }}
                  children={
                    <Spinner
                      style={{ opacity: postsData?.posts.hasMore ? 100 : 0 }}
                    />
                  }
                />
              )}
              onEndReachedThreshold={0.15}
              onEndReached={() => {
                if (postsData?.posts.hasMore) {
                  loadMorePosts?.({
                    variables: {
                      ...postsVariables,
                      skip: postsData?.posts.posts.length,
                    },
                  });
                }
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};
