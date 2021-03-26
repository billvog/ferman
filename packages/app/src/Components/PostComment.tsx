import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  FullCommentFragment,
  FullUserFragment,
  useDeleteCommentMutation,
} from "../generated/graphql";
import moment from "moment";
import { MAIN_DARK_BLUE } from "../Styles/Global";
import { Entypo, Feather } from "@expo/vector-icons";
import { ActionSheet, Toast } from "native-base";
import { DefaultToastStyles } from "../Styles/Toast";

interface PostCommentProps {
  me: FullUserFragment;
  comment: FullCommentFragment;
  onPress?: () => any;
  onDelete?: () => any;
}

export const PostComment: React.FC<PostCommentProps> = ({
  me,
  comment,
  onPress,
  onDelete,
}) => {
  const [deleteComment] = useDeleteCommentMutation();

  const deleteCommentHandler = async () => {
    const { data } = await deleteComment({
      variables: { id: comment.id },
      update: (cache, { data }) => {
        if (data?.deleteComment) {
          if (comment.parentId)
            cache.evict({
              id: "Comment:" + comment.parentId,
            });

          cache.evict({ id: "Comment:" + comment.id });
          cache.evict({ id: "Post:" + comment.postId });
        }
      },
    });

    if (!data || !data.deleteComment) {
      return Alert.alert(
        "Failed",
        "Couldn't delete comment. Internal server error."
      );
    }

    Toast.show({
      ...DefaultToastStyles,
      text: "Comment Deleted",
      type: "success",
      buttonText: "Close",
    });

    if (typeof onDelete === "function") onDelete();
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={() => typeof onPress === "function" && onPress()}
      >
        <View style={styles.MainWrapper}>
          <View style={styles.TopSection}>
            <View style={styles.UserInfo}>
              <Text style={styles.UserUsername}>{comment.user.username}</Text>
              <Text style={styles.UserUid}>@{comment.user.uid}</Text>
            </View>
            <Text style={styles.CreatedDate}>
              {moment(parseFloat(comment.createdAt)).fromNow()}
            </Text>
          </View>
          <Text style={styles.Content}>{comment.text}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.Footer}>
        <View>
          <Text style={styles.RepliesCount}>
            <Feather name="message-square" size={12} /> {comment.repliesCount}
          </Text>
        </View>
        <View>
          {comment.user.id === me.id && (
            <>
              <TouchableOpacity
                style={styles.MoreOptionsButton}
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
                          "Are you sure you want to remove this comment? All replies will be removed as well.",
                          [
                            {
                              text: "Delete",
                              style: "destructive",
                              onPress: async () => {
                                deleteCommentHandler();
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
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  MainWrapper: {
    padding: 10,
    paddingBottom: 0,
  },
  TopSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  UserUsername: {
    fontSize: 13,
    fontWeight: "600",
    color: MAIN_DARK_BLUE,
  },
  UserUid: {
    marginLeft: 4,
    fontSize: 11,
    color: "dimgrey",
  },
  CreatedDate: {
    fontSize: 11,
    color: "dimgrey",
  },
  Content: {
    fontSize: 13,
    color: "dimgrey",
  },
  Footer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 6,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  RepliesCount: {
    fontSize: 12,
    color: "brown",
    marginLeft: 3,
  },
  MoreOptionsButton: {
    marginRight: 3,
  },
});
