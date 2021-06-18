import { Ionicons } from "@expo/vector-icons";
import { BasicUserFragment, FullChatFragment } from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { ChatParamList } from "../../../navigation/AppTabs/Stacks/Chat/ParamList";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface ChatroomHeaderProps {
  otherUser: BasicUserFragment;
  chat: FullChatFragment;
}

export const ChatroomHeader: React.FC<ChatroomHeaderProps> = ({
  otherUser,
}) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation<StackNavigationProp<ChatParamList>>();

  return (
    <SafeAreaView style={styles.base}>
      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === "ios" ? 10 : 30,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
          children={
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color={colors.primary600}
            />
          }
        />
        <View style={styles.userSection}>
          <TouchableOpacity
            style={styles.userAvatarSection}
            onPress={() =>
              navigation.push("UserProfile", { userId: otherUser.id })
            }
          >
            <Image
              source={{
                uri: otherUser.profile.avatarUrl,
                width: 32,
                height: 32,
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
          </TouchableOpacity>
          <View style={styles.usernameContainer}>
            <Text style={styles.usernameText}>{otherUser.username}</Text>
            <Text style={styles.lastOnlineText}>
              {otherUser.isOnline
                ? t("user.active_now")
                : t("user.last_seen").replace(
                    "%time%",
                    dayjs(parseFloat(otherUser.lastSeen)).fromNow(true)
                  )}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "white",
  },
  container: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 12,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatarSection: {
    marginRight: 12,
    position: "relative",
    padding: 4,
  },
  userAvatar: {
    borderRadius: 10,
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
    borderColor: "white",
  },
  usernameContainer: {},
  usernameText: {
    fontSize: fontSize.paragraph,
    fontFamily: fontFamily.inter.medium,
    color: colors.primary800,
  },
  lastOnlineText: {
    fontSize: fontSize.small,
    color: colors.primary500,
  },
});
