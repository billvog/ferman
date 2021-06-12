import React from "react";
import { useContext } from "react";
import { AuthContext } from "../modules/auth/AuthProvider";
import { FullPostFragment } from "../../../controller/dist";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors, fontSize } from "../constants/style";
import dayjs from "dayjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  MainNavProps,
  MainParamList,
} from "src/navigation/MainStack/ParamList";

interface PostProps {
  post: FullPostFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { me } = useContext(AuthContext);
  const navigation = useNavigation<MainNavProps<"Feed">["navigation"]>();

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() =>
            navigation.navigate("ViewUserProfile", {
              userId: post.creator.id,
            })
          }
        >
          <Image
            source={{
              uri: post.creator.profile.avatarUrl,
              width: 26,
              height: 26,
            }}
            style={{
              borderRadius: 8,
            }}
          />
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={styles.creatorContainer}
              onPress={() =>
                navigation.navigate("ViewUserProfile", {
                  userId: post.creator.id,
                })
              }
            >
              <Text style={styles.creatorUsername}>
                {post.creator.username}
              </Text>
              <Text style={styles.creatorUid}>@{post.creator.uid}</Text>
            </TouchableOpacity>
            <Text style={styles.createdAt}>
              {dayjs(parseFloat(post.createdAt)).fromNow()}
            </Text>
          </View>
          <View>
            {post.parentPost && (
              <View style={styles.parentPostContainer}>
                <Text style={styles.replyingTo}>Replying to </Text>
                <TouchableOpacity>
                  <Text style={styles.replyingToUser}>
                    @{post.parentPost.creator.uid}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewPost", {
                  postId: post.id,
                })
              }
            >
              <Text style={styles.textContainer}>{post.body}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary200,
  },
  avatarContainer: {
    marginRight: 10,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  creatorContainer: {
    flexDirection: "column",
  },
  creatorUsername: {
    fontSize: fontSize.paragraph,
    color: colors.primary700,
    fontWeight: "700",
  },
  creatorUid: {
    fontSize: fontSize.small,
    fontWeight: "500",
    color: colors.primary700,
  },
  createdAt: {
    fontWeight: "500",
    fontSize: fontSize.small,
    color: colors.primary500,
  },
  parentPostContainer: {
    flexDirection: "row",
    marginBottom: 2,
  },
  replyingTo: {
    color: colors.primary500,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  replyingToUser: {
    color: colors.accentWashedOut,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  textContainer: {
    fontWeight: "600",
    fontSize: fontSize.md,
    color: colors.primary700,
  },
});
