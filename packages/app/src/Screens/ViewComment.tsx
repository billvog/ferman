import { useApolloClient } from "@apollo/client";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { PostComment } from "../Components/PostComment";
import { UserCard } from "../Components/UserCard";
import {
  useMeQuery,
  useUserQuery,
  useViewCommentQuery,
} from "../generated/graphql";
import { FeedNavProps } from "../Types/FeedParamList";

export const ViewComment = ({ route, navigation }: FeedNavProps<"Comment">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
  } = useViewCommentQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: route.params.commentId,
    },
  });
  const { data: userData, loading: userLoading } = useUserQuery({
    skip: typeof commentsData?.viewComment.parent.user.id !== "number",
    variables: {
      id: commentsData?.viewComment.parent.user.id,
    },
  });

  React.useLayoutEffect(() => {
    if (userData?.user) {
      navigation.setOptions({
        headerTitle: userData?.user.uid + "'s comment",
      });
    }
  }, [navigation, userData?.user?.uid]);

  return (
    <Layout>
      {commentsLoading || userLoading || meLoading ? (
        <ActivityIndicator color="grey" />
      ) : !commentsData?.viewComment.parent ? (
        <ErrorText>Comment not found</ErrorText>
      ) : !commentsData || !userData || !meData || !meData.me ? (
        <ErrorText>Internal server error</ErrorText>
      ) : !userData.user ? (
        <ErrorText>User not found</ErrorText>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={commentsLoading}
              onRefresh={async () => {
                apolloClient.cache.evict({ fieldName: "comments" });
                apolloClient.cache.evict({ fieldName: "viewComment" });
                refetchComments();
              }}
            />
          }
        >
          <UserCard
            me={meData.me}
            user={userData.user}
            onPress={() =>
              navigation.navigate("User", {
                userId: userData.user!.id,
              })
            }
          />
          <View style={{ margin: 6 }} />
          <PostComment
            comment={commentsData.viewComment.parent}
            me={meData.me}
            onDelete={() => {
              if (commentsData.viewComment.parent.parentId) {
                return navigation.replace("Comment", {
                  commentId: commentsData.viewComment.parent.parentId,
                });
              }

              navigation.goBack();
            }}
          />
          <View>
            <View style={styles.RepliesTopSection}>
              <Text style={styles.RepliesCount}>
                Replies ({commentsData.viewComment.replies.length})
              </Text>
              <TouchableOpacity
                style={styles.ReplyButton}
                onPress={() =>
                  navigation.navigate("CreateComment", {
                    postId: commentsData.viewComment.parent.postId,
                    reply: true,
                    parentId: commentsData.viewComment.parent.id,
                  })
                }
              >
                <Text style={styles.ReplyButtonText}>
                  <Entypo name="reply" /> reply
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {commentsData.viewComment.replies.length === 0 ? (
                <Text style={styles.NoCommentsText}>
                  There are no replies...
                </Text>
              ) : (
                <View style={styles.CommentContainer}>
                  {commentsData.viewComment.replies.map((comment) => (
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
          </View>
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  RepliesTopSection: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  RepliesCount: {
    color: "dimgrey",
    fontSize: 14,
  },
  ReplyButton: {
    backgroundColor: "brown",
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 100 / 2,
  },
  ReplyButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  NoCommentsText: {
    marginTop: 3,
    fontSize: 12,
    color: "#c0c0c0",
  },
  CommentContainer: {
    marginTop: 10,
  },
});
