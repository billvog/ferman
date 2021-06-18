import { FullChatFragment } from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontFamily, small, xsmall } from "../constants/style";
import { AuthContext } from "../modules/auth/AuthProvider";
import { ChatParamList } from "../navigation/AppTabs/Stacks/Chat/ParamList";
import { HomeNavProps } from "../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface ChatProps {
  chat: FullChatFragment;
}

export const Chat: React.FC<ChatProps> = ({ chat }) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation<StackNavigationProp<ChatParamList>>();
  const { me } = useContext(AuthContext);
  if (!me) return null;

  const otherUser = chat.senderId === me.id ? chat.reciever : chat.sender;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Chatroom", {
          chatId: chat.id,
        })
      }
    >
      <View style={styles.userAvatarSection}>
        <Image
          source={{
            uri: otherUser.profile.avatarUrl,
            width: 34,
            height: 34,
          }}
          style={styles.userAvatar}
        />
        <View style={styles.userStatusIndicatorContainer}>
          <View
            style={[
              styles.userStatusIndicator,
              {
                backgroundColor: otherUser.isOnline
                  ? colors.success
                  : colors.warning,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.mainSection}>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameText}>{otherUser.username}</Text>
          {chat.hasUnreadMessage && <View style={styles.unreadMsgIndicator} />}
        </View>
        {chat.latestMessage && chat.latestMessage.text.length < 25 ? (
          <View style={styles.latestMessageContainer}>
            <Text style={styles.latestMessageText}>
              {chat.latestMessage.userId === me.id && (
                <Text style={{ fontFamily: fontFamily.inter.bold }}>
                  {t("common.you")}:{" "}
                </Text>
              )}
              {chat.latestMessage.text}
            </Text>
            <Text style={styles.latestMessageDateText}>
              {dayjs(chat.latestMessage.createdAt).fromNow()}
            </Text>
          </View>
        ) : (
          <Text style={styles.userLastSeenText}>
            {otherUser.isOnline
              ? t("user.active_now")
              : t("user.last_seen").replace(
                  "%time%",
                  dayjs(parseFloat(otherUser.lastSeen)).fromNow(true)
                )}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary200,
  },
  userAvatarSection: {
    marginRight: 12,
    position: "relative",
    padding: 4,
  },
  userAvatar: {
    borderRadius: 11,
  },
  userStatusIndicatorContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  userStatusIndicator: {
    width: 13,
    height: 13,
    borderRadius: 100 / 2,
    borderWidth: 2,
    borderColor: colors.primary100,
  },
  mainSection: {
    flex: 1,
    flexDirection: "column",
  },
  usernameContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  usernameText: {
    color: colors.primary600,
    fontFamily: fontFamily.inter.bold,
  },
  unreadMsgIndicator: {
    marginLeft: 8,
    width: 6,
    height: 6,
    borderRadius: 100 / 2,
    backgroundColor: colors.info,
    transform: [{ translateY: 0.7 }],
  },
  latestMessageContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  latestMessageText: {
    ...small,
    fontFamily: fontFamily.inter.medium,
    color: colors.primary600,
  },
  latestMessageDateText: {
    ...xsmall,
    color: colors.primary450,
  },
  userLastSeenText: {
    ...small,
    fontFamily: fontFamily.inter.regular,
    color: colors.primary600,
  },
});
