import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import {
  FullPostFragment,
  likePostMutationOptions,
  useLikePostMutation,
} from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useContext } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fontSize } from "../constants/style";
import { AuthContext } from "../modules/auth/AuthProvider";
import { FeedNavProps } from "../navigation/AppTabs/Stacks/Feed/ParamList";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { Spinner } from "./Spinner";

interface PostProps {
  post: FullPostFragment;
  onDelete?: () => any;
}

export const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const { me } = useContext(AuthContext);
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation<FeedNavProps<"Feed">["navigation"]>();

  const [likePost, { loading: likeLoading }] = useLikePostMutation();
  const LikePostHandler = async () => {
    const { data } = await likePost(
      likePostMutationOptions({
        id: post.id,
      }) as any
    );

    if (!data || data.likePost.error) {
      Alert.alert(t("common.error"), t("errors.oops"));
    }
  };

  // const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();
  // const DeletePostHandler = async () => {
  //   const response = await deletePost(
  //     deletePostMutationOptions({
  //       id: post.id,
  //     }) as any
  //   );

  //   if (response.errors || !response.data?.deletePost) {
  //     return Alert.alert(t("common.error"), t("post.alert.cannot_delete"));
  //   }

  //   Alert.alert(t("common.success"), t("post.alert.deleted"));

  //   if (typeof onDelete === "function") {
  //     onDelete();
  //   }
  // };

  return (
    <View style={styles.wrapper}>
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
            <View>
              <Text style={styles.textContainer}>{post.body}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionItem} onPress={LikePostHandler}>
          {likeLoading ? (
            <Spinner size="s" color={colors.error} />
          ) : (
            <AntDesign
              name={post.likeStatus ? "heart" : "hearto"}
              size={14}
              color={colors.error}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={(styles.actionItem, styles.actionItemsNotFirst)}
          onPress={() =>
            navigation.navigate("ViewPost", {
              postId: post.id,
            })
          }
        >
          <Ionicons name="chatbox" size={16} color={colors.secondary50} />
        </TouchableOpacity>
        {post.creator.id === me.id && (
          <TouchableOpacity
            style={(styles.actionItem, styles.actionItemsNotFirst)}
          >
            <Entypo
              name="dots-three-horizontal"
              size={14}
              color={colors.accentWashedOut}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary200,
  },
  container: {
    flexDirection: "row",
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 14,
  },
  actionItem: {
    justifyContent: "center",
    alignContent: "center",
  },
  actionItemsNotFirst: {
    marginLeft: 32,
  },
});
