import { useApolloClient } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { Loading } from "../Components/Loading";
import { Post } from "../Components/Post";
import { PostComment } from "../Components/PostComment";
import { UserCard } from "../Components/UserCard";
import {
  useCommentsQuery,
  useMeQuery,
  usePostQuery,
  useUserQuery,
} from "../generated/graphql";
import { FeedNavProps } from "../Types/FeedParamList";

export const ViewPost = ({ navigation, route }: FeedNavProps<"Post">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: postData,
    loading: postLoading,
    refetch: refetchPost,
  } = usePostQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: route.params.postId,
    },
  });
  const { data: userData, loading: userLoading } = useUserQuery({
    skip: !postData?.post?.creator.id,
    variables: {
      id: postData?.post?.creator.id || -1,
    },
  });
  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useCommentsQuery({
    skip: !postData?.post?.id,
    variables: {
      postId: postData?.post?.id || "",
    },
  });

  React.useLayoutEffect(() => {
    if (postData?.post) {
      navigation.setOptions({
        headerTitle: postData.post.title,
      });
    }
  }, [navigation, postData?.post?.title || null]);

  return (
    <Layout container>
      {postLoading || meLoading || userLoading ? (
        <Loading />
      ) : !postData?.post ? (
        <ErrorText>Post not found</ErrorText>
      ) : !userData?.user ? (
        <ErrorText>Creator not found</ErrorText>
      ) : !postData || !meData?.me || !userData ? (
        <ErrorText>Internal server error</ErrorText>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={postLoading}
              onRefresh={async () => {
                apolloClient.cache.evict({ id: "Post:" + postData.post?.id });
                apolloClient.cache.evict({ fieldName: "comments" });
                apolloClient.cache.evict({
                  fieldName: "viewComment",
                });
                await refetchPost();
                await refetchComments();
              }}
            />
          }
        >
          <View>
            <UserCard
              me={meData.me}
              user={userData.user}
              onPress={() =>
                navigation.navigate("User", {
                  userId: postData.post!.creator.id,
                })
              }
            />
            <View style={{ margin: 6 }} />
            <Post me={meData.me} post={postData.post} />
          </View>
          <View>
            {commentsLoading && !commentsData ? (
              <ActivityIndicator color="grey" />
            ) : !commentsData ? (
              <Text style={{ color: "indianred" }}>Couldn't load comments</Text>
            ) : (
              <>
                <View style={styles.CommentsTopSection}>
                  <Text style={styles.CommentsCount}>
                    Comments ({commentsData.comments?.length})
                  </Text>
                  <TouchableOpacity
                    style={styles.CommentButton}
                    onPress={() =>
                      navigation.navigate("CreateComment", {
                        postId: postData.post!.id,
                        reply: false,
                      })
                    }
                  >
                    <Text style={styles.CommentButtonText}>
                      <Entypo name="message" /> comment
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  {commentsData.comments?.length === 0 ? (
                    <Text style={styles.NoCommentsText}>
                      There are no comments...
                    </Text>
                  ) : (
                    <View style={{ marginTop: 10 }}>
                      {commentsData?.comments?.map((comment) => (
                        <PostComment
                          key={comment.id}
                          comment={comment}
                          me={meData.me!}
                          onPress={() =>
                            navigation.navigate("Comment", {
                              commentId: comment.id,
                            })
                          }
                        />
                      ))}
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  CommentsTopSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  CommentsCount: {
    color: "dimgrey",
    fontSize: 14,
  },
  CommentButton: {
    backgroundColor: "brown",
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 100 / 2,
  },
  CommentButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  NoCommentsText: {
    marginTop: 3,
    fontSize: 12,
    color: "#c0c0c0",
  },
  CommentsContainer: {
    marginTop: 10,
  },
});
