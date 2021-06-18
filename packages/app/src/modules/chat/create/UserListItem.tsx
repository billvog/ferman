import React from "react";
import { FullUserFragment } from "@ferman-pkgs/controller";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { Text } from "react-native";
import {
  colors,
  fontFamily,
  fontSize,
  paragraphBold,
} from "../../../constants/style";

interface UserListItemProps {
  user: FullUserFragment;
  onPress: () => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  user,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.profile.avatarUrl,
            width: 36,
            height: 36,
          }}
        />
      </View>
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{user.username}</Text>
        <Text style={styles.uidText}>@{user.uid}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary200,
  },
  avatarContainer: {},
  avatar: {
    borderRadius: 13,
  },
  usernameContainer: {
    flexDirection: "column",
    marginLeft: 12,
  },
  usernameText: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize.h6,
  },
  uidText: {
    fontFamily: fontFamily.inter.regular,
    fontSize: fontSize.md,
  },
});
