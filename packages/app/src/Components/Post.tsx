import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  FullPostFragment,
  FullUserFragment,
  useDeletePostMutation,
  useLikePostMutation,
} from "../generated/graphql";
import { MAIN_DARK_BLUE } from "../Styles/Global";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActionSheet, Toast } from "native-base";
import { DefaultToastStyles } from "../Styles/Toast";

interface PostProps {
  post: FullPostFragment;
  me: FullUserFragment;
  onPress?: () => any;
  onDelete?: () => any;
}

export const Post: React.FC<PostProps> = ({ post, me, onPress, onDelete }) => {
  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={() => typeof onPress === "function" && onPress()}
      >
        <View style={styles.MainWrapper}>
          <Text style={styles.Title}>{post.title}</Text>
          <Text style={styles.Body}>{post.body}</Text>
          <Text style={styles.Footer}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>
                {post.creator.username}
              </Text>{" "}
              · @{post.creator.uid} ·{" "}
              {moment(parseFloat(post.createdAt)).fromNow()}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.ActionButtons}>
        <View style={styles.ActionButtonsLeft}>
          <TouchableOpacity
            disabled={me.id === post.creator.id}
            style={styles.LikeButton}
            onPress={async () => {
              const { data } = await likePost({
                variables: {
                  postId: post.id,
                },
              });

              if (!data || data.like.error) {
                return Alert.alert("Failed", "Internal server error");
              }
            }}
          >
            <Text style={styles.LikeButtonText}>
              <AntDesign name={post.likeStatus ? `heart` : `hearto`} />{" "}
              {post.points}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CommentsCounter}>
            <Text style={styles.CommentsCounterText}>
              <Feather name="message-square" size={13} /> {post.commentsCount}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {post.creator.id === me.id && (
            <>
              <TouchableOpacity
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: ["Delete", "Cancel"],
                      cancelButtonIndex: 1,
                      destructiveButtonIndex: 0,
                      title: "Choose action",
                    },
                    async (buttonIndex) => {
                      if (buttonIndex === 0) {
                        Alert.alert(
                          "Confirm",
                          "Are you sure you want to remove this post? All comments and likes will be removed as well.",
                          [
                            {
                              text: "Delete",
                              style: "destructive",
                              onPress: async () => {
                                const { data } = await deletePost({
                                  variables: { id: post.id },
                                  update: (store, { data }) => {
                                    if (data?.deletePost) {
                                      store.evict({ id: "Post:" + post.id });
                                    }
                                  },
                                });

                                if (!data || !data.deletePost) {
                                  return Alert.alert(
                                    "Failed",
                                    "Couldn't delete post. Internal server error."
                                  );
                                }

                                Toast.show({
                                  ...DefaultToastStyles,
                                  text: "Post Deleted",
                                  type: "success",
                                  buttonText: "Close",
                                });

                                if (typeof onDelete === "function") onDelete();
                              },
                            },
                            {
                              text: "Cancel",
                              onPress: () => {},
                              style: "cancel",
                            },
                          ]
                        );
                      }
                    }
                  )
                }
              >
                <Entypo
                  name="dots-three-horizontal"
                  size={13}
                  color="dimgrey"
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginBottom: 15,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  MainWrapper: {
    padding: 10,
    paddingHorizontal: 12,
  },
  Title: {
    fontSize: 16,
    fontWeight: "600",
    color: MAIN_DARK_BLUE,
  },
  Body: {
    fontSize: 13,
  },
  Footer: {
    marginTop: 5,
    fontSize: 10,
    color: "dimgrey",
  },
  ActionButtons: {
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
    backgroundColor: "#e8e8e8",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 10,
    paddingTop: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  ActionButtonsLeft: {
    flexDirection: "row",
  },
  LikeButton: {
    alignSelf: "flex-start",
  },
  LikeButtonText: {
    color: "brown",
    fontSize: 12,
  },
  CommentsCounter: {
    marginLeft: 14,
  },
  CommentsCounterText: {
    color: "peru",
    fontSize: 12,
  },
});
