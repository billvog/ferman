import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  deletePostMutationOptions,
  FullPostFragment,
  useDeletePostMutation,
  useLikePostMutation,
} from "@ferman-pkgs/controller";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import * as Haptics from "expo-haptics";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
} from "react-native";
import { colors, fontFamily, fontSize, paragraph } from "../constants/style";
import { AuthContext } from "../modules/auth/AuthProvider";
import { HomeParamList } from "../navigation/AppTabs/Stacks/Home/ParamList";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { PostActionsModal } from "./PostActionsModal";
import { Spinner } from "./Spinner";

interface PostProps {
  post: FullPostFragment;
  onDelete?: () => any;
}

export const Post: React.FC<PostProps> = ({ post, onDelete }) => {
  const { me } = useContext(AuthContext);
  const { t } = useTypeSafeTranslation();

  const navigation = useNavigation<StackNavigationProp<HomeParamList>>();
  const route = useRoute<RouteProp<HomeParamList, "ViewPost">>();

  const [isModalOpen, setModalOpen] = useState(false);

  const [likePost, { loading: likeLoading }] = useLikePostMutation();
  const LikePostHandler = async () => {
    const { data } = await likePost({
      variables: { id: post.id },
    });

    if (!data || data.likePost.error) {
      Alert.alert(t("common.error"), t("errors.oops"));
    }
  };

  const [deletePost] = useDeletePostMutation();
  const DeletePostHandler = async () => {
    const { errors, data } = await deletePost(
      deletePostMutationOptions({
        id: post.id,
      }) as any
    );

    if (errors || data?.deletePost.error) {
      return Alert.alert(t("common.error"), t("post.alert.cannot_delete"));
    }

    Alert.alert(t("common.success"), t("post.alert.deleted"));

    if (typeof onDelete === "function") {
      onDelete();
    }
  };

  const SharePostHandler = async () => {
    Clipboard.setString(`https://ferman.ga/post/${post.id}`);
    Alert.alert(t("common.success"), t("post.link_copied_to_clipboard"));
  };

  const navigateToCreator = () => {
    navigation.push("UserProfile", {
      userId: post.creator.id,
    });
  };

  const navigateToParentPostCreator = () => {
    navigation.push("UserProfile", {
      userId: post.parentPost?.creator.id || -1,
    });
  };

  const navigateToPost = () => {
    if (route.params?.postId === post.id) return;
    navigation.push("ViewPost", {
      postId: post.id,
    });
  };

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={navigateToPost}
      onLongPress={() => {
        Haptics.impactAsync();
        setModalOpen(true);
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={navigateToCreator}
        >
          <Image
            source={{
              uri: post.creator.profile?.avatarUrl,
              width: 32,
              height: 32,
            }}
            style={{
              borderRadius: 12,
            }}
          />
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <View style={styles.infoContainer}>
            <TouchableOpacity
              style={styles.creatorContainer}
              onPress={navigateToCreator}
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
                <Text style={styles.replyingTo}>{t("post.replying_to")}</Text>
                <TouchableOpacity onPress={navigateToParentPostCreator}>
                  <Text style={styles.replyingToUser}>
                    @{post.parentPost.creator.uid}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View>
              <Text style={styles.textContainer}>
                {useRichBodyText(post.body)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionItem}
          disabled={post.creator.id === me?.id}
          onPress={LikePostHandler}
        >
          <View style={styles.actionItemContentWrapper}>
            <View
              style={{
                position: "absolute",
                opacity: likeLoading ? 100 : 0,
              }}
              children={<Spinner size="s" color={colors.error} />}
            />
            <View
              style={{
                opacity: likeLoading ? 0 : 100,
              }}
              children={
                <AntDesign
                  name={post.likeStatus ? "heart" : "hearto"}
                  size={14}
                  color={colors.error}
                />
              }
            />
            <Text
              style={[
                styles.actionItemText,
                {
                  color: colors.error,
                  fontWeight: post.likeStatus ? "800" : "600",
                },
              ]}
            >
              {post.points}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={(styles.actionItem, styles.actionItemsNotFirst)}
          onPress={navigateToPost}
        >
          <View style={styles.actionItemContentWrapper}>
            <Ionicons name="chatbox" size={16} color={colors.secondary50} />
            <Text
              style={[
                styles.actionItemText,
                {
                  color: colors.secondary100,
                },
              ]}
            >
              {post.repliesCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <PostActionsModal
        isMine={post.creator.id === me?.id}
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        onShare={SharePostHandler}
        onDelete={DeletePostHandler}
      />
    </TouchableOpacity>
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
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize.paragraph,
    color: colors.primary800,
    lineHeight: 20,
  },
  creatorUid: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.md,
    color: colors.primary700,
    lineHeight: 15.8,
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
    marginRight: 3,
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
    ...paragraph,
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
  actionItemContentWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  actionItemText: {
    marginLeft: 10,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  actionItemsNotFirst: {
    marginLeft: 32,
  },
});
