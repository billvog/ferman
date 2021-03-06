import {
  FullMessageFragment,
  useDeleteMessageMutation,
  useMarkMessageReadMutation,
} from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import * as Haptics from "expo-haptics";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontSize, paragraph, radius, small } from "../constants/style";
import { AuthContext } from "../modules/auth/AuthProvider";
import { ChatParamList } from "../navigation/AppTabs/Stacks/Chat/ParamList";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { ChatMessageActionsModal } from "./ChatMessageActionsModal";

interface ChatMessageProps {
  message: FullMessageFragment;
  showRead: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  showRead,
}) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation<StackNavigationProp<ChatParamList>>();
  const { me } = useContext(AuthContext);
  if (!me) return null;

  const isMe = message.userId === me.id;

  const [markRead] = useMarkMessageReadMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const [actionsModalOpen, setActionsModalOpen] = useState(false);

  const navigationToOtherUser = () =>
    navigation.push("UserProfile", {
      userId: message.userId,
    });

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isMe ? "row-reverse" : "row",
        },
      ]}
    >
      {isMe && (
        <ChatMessageActionsModal
          isModalOpen={actionsModalOpen}
          closeModal={() => setActionsModalOpen(false)}
          onDelete={() =>
            deleteMessage({
              variables: {
                chatId: message.chatId,
                messageId: message.id,
              },
            })
          }
        />
      )}
      <View
        style={[
          styles.innerContainer,
          {
            alignItems: isMe ? "flex-end" : "flex-start",
          },
        ]}
      >
        <View style={styles.mainSection}>
          {!isMe && (
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={navigationToOtherUser}
            >
              <Image
                source={{
                  uri: message.user.profile.avatarUrl,
                  width: 32,
                  height: 32,
                }}
                style={styles.userAvatar}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onLongPress={() => {
              if (isMe) {
                Haptics.impactAsync();
                setActionsModalOpen(true);
              }
            }}
            style={[
              styles.messageContainer,
              {
                borderBottomRightRadius: isMe ? 0 : undefined,
                borderBottomLeftRadius: isMe ? undefined : 0,
              },
            ]}
          >
            <Text style={styles.messageText}>
              {useRichBodyText(message.text)}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.messageInfoContainer,
            {
              marginLeft: isMe ? 0 : 44,
            },
          ]}
        >
          <Text style={styles.messageInfoText}>
            {dayjs(message.createdAt).fromNow()}
            {showRead && isMe && message.read && ", " + t("chat.message_read")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: "100%",
  },
  innerContainer: {
    padding: 6,
    flexDirection: "column",
  },
  mainSection: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  avatarContainer: {
    marginRight: 12,
  },
  userAvatar: { borderRadius: 11 },
  messageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.primary200,
    padding: 13,
    borderRadius: radius.l,
  },
  messageText: {
    ...paragraph,
    fontSize: fontSize.md,
    color: colors.primary600,
  },
  messageInfoContainer: {
    marginTop: 2,
  },
  messageInfoText: {
    ...small,
    color: colors.primary450,
  },
});
