import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePostQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { CenterSpinner } from "../../components/CenterSpinner";
import { HomeNavProps } from "../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Post } from "../../components/Post";
import { ErrorText } from "../../components/ErrorText";
import { colors, fontFamily } from "../../constants/style";
import { MyButton } from "../../components/MyButton";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";

export const PostController: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"ViewPost">) => {
  const { t } = useTypeSafeTranslation();
  const {
    data: postData,
    error: postError,
    loading: postLoading,
    fetchMore: loadMoreReplies,
    refetch: refreshPosts,
    variables: postVariables,
    client,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: typeof route.params === "undefined",
    variables: {
      limit: 15,
      skip: 0,
      parentPostId: route.params.postId,
    },
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshPostsHandler = async () => {
    // update state
    setIsRefreshing(true);
    // clear cache from query
    client.cache.evict({
      fieldName: "posts",
    });
    // refetch
    await refreshPosts({
      ...postVariables,
      skip: 0,
    });
    // update state
    setIsRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {postLoading && !postData ? (
        <CenterSpinner />
      ) : !postData && postError ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : !postData?.posts.parent ? (
        <ErrorText>{t("post.not_found")}</ErrorText>
      ) : (
        <ScrollViewLoadMore
          isLoading={postLoading && !isRefreshing}
          isRefreshing={isRefreshing}
          onRefresh={refreshPostsHandler}
          onLoadMore={() => {
            loadMoreReplies({
              variables: {
                ...postVariables,
                skip: postData.posts.posts.length,
              },
            });
          }}
          shouldLoadMore={postData?.posts.hasMore}
          scrollViewProps={{
            style: {
              flex: 1,
            },
          }}
        >
          <Post
            post={postData.posts.parent}
            key={`view-post:${postData.posts.parent.id}`}
            onDelete={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate("Feed")
            }
          />
          <View style={styles.repliesCountContainer}>
            <View style={styles.repliesCountWrapper}>
              <Text style={styles.repliesCountText}>
                {postData.posts.count === 1
                  ? t("post.reply")
                  : t("post.replies")}{" "}
              </Text>
              <Text style={styles.repliesCountIndicator}>
                ({postData.posts.count})
              </Text>
            </View>
            <MyButton
              onPress={() => {
                navigation.navigate("ReplyPost", {
                  parentPostId: postData.posts.parent?.id || "",
                });
              }}
              title={t("post.reply")}
              size="tiny"
            />
          </View>

          {postData?.posts.count === 0 ? (
            <View
              children={<ErrorText>{t("post.no_replies")}</ErrorText>}
              style={{ marginTop: 18 }}
            />
          ) : (
            <View
              style={{
                flexDirection: "column",
              }}
            >
              {postData?.posts.posts.map((p) => (
                <Post key={`post-reply:${p.id}`} post={p} />
              ))}
            </View>
          )}
        </ScrollViewLoadMore>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  repliesCountContainer: {
    padding: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  repliesCountWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  repliesCountText: {
    color: colors.primary700,
    fontFamily: fontFamily.inter.bold,
  },
  repliesCountIndicator: {
    color: colors.primary700,
    fontFamily: fontFamily.inter.medium,
  },
});
