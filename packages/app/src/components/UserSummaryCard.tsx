import React from "react";
import {
  followMutationOptions,
  FullUserFragment,
  useFollowMutation,
} from "@ferman-pkgs/controller";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors,
  fontFamily,
  fontSize,
  radius,
  small,
} from "../constants/style";
import { Image } from "react-native";
import { Text } from "react-native";
import { MyButton } from "./MyButton";
import { useNavigation } from "@react-navigation/native";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";

interface UserSummaryCardProps {
  user: FullUserFragment;
}

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({ user }) => {
  const { me } = useContext(AuthContext);
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation();

  const [followUser, { loading: followLoading }] = useFollowMutation();
  const followUserHandler = async () => {
    const { data } = await followUser(
      followMutationOptions({
        userId: user.id,
      }) as any
    );

    if (!data || data.follow.error || !data.follow.users) {
      return Alert.alert(t("common.error"), t("errors.oops"));
    }
  };

  const FollowButtonIcon = user.followingStatus ? (
    <MaterialCommunityIcons
      name="account-minus"
      size={18}
      color={colors.error}
    />
  ) : (
    <MaterialCommunityIcons
      name="account-plus"
      size={18}
      color={colors.primary700}
    />
  );

  const navigateToUser = () => {
    navigation.navigate("UserProfile", {
      userId: user.id,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={navigateToUser}>
        <Image
          source={{
            uri: user.profile?.avatarUrl,
            width: 32,
            height: 32,
          }}
          style={{
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>
      <View style={styles.userContainer}>
        <View style={styles.userContainerTopSection}>
          <TouchableOpacity
            style={styles.userNameContainer}
            onPress={navigateToUser}
          >
            <Text style={styles.usernameText}>{user.username}</Text>
            <View style={styles.uidContainer}>
              <Text style={styles.uidText}>@{user.uid}</Text>
              {user.followsYouStatus && (
                <View style={styles.followsYouContainer}>
                  <Text style={styles.followsYouText}>
                    {t("user.follows_you")}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          {me?.id !== user.id && (
            <View>
              <MyButton
                size="tiny"
                isLoading={followLoading}
                loadingColor={colors.primary700}
                color="transparent"
                onPress={followUserHandler}
              >
                {FollowButtonIcon}
              </MyButton>
            </View>
          )}
        </View>
        {!!user.profile?.bio && (
          <View style={styles.userProfileBioContainer}>
            <Text style={styles.userProfileBio}>
              {useRichBodyText(user.profile.bio)}
            </Text>
          </View>
        )}
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
  avatarContainer: {},
  userContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
  },
  userContainerTopSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  userNameContainer: {
    flexDirection: "column",
  },
  usernameText: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize.paragraph,
    color: colors.primary800,
  },
  uidContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uidText: {
    fontFamily: fontFamily.inter.medium,
    fontSize: fontSize.small,
    color: colors.primary700,
  },
  followsYouContainer: {
    marginLeft: 6,
    marginTop: 2,
    backgroundColor: colors.primary300,
    borderRadius: radius.s,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  followsYouText: {
    color: colors.primary500,
    fontSize: fontSize.small,
    fontWeight: "700",
  },
  userProfileBioContainer: {
    marginTop: 6,
  },
  userProfileBio: {
    ...small,
    color: colors.primary500,
  },
});
