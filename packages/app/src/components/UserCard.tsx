import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  followMutationOptions,
  FullUserFragment,
  useFollowMutation,
} from "@ferman-pkgs/controller";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useContext } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  fontFamily,
  fontSize,
  paragraph,
  radius,
} from "../constants/style";
import { AuthContext } from "../modules/auth/AuthProvider";
import { HomeParamList } from "../navigation/AppTabs/Stacks/Home/ParamList";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { MyButton } from "./MyButton";

interface UserCardProps {
  user: FullUserFragment;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { me } = useContext(AuthContext);
  const { t } = useTypeSafeTranslation();

  const navigation = useNavigation<StackNavigationProp<HomeParamList>>();
  const route = useRoute<RouteProp<HomeParamList, "UserProfile">>();

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

  const FollowButtonText = user.followingStatus
    ? t("user.unfollow")
    : t("user.follow");

  const navigateToEditUser = () =>
    navigation.navigate("EditProfile", {
      submitForm: undefined,
    });
  const navigateToUser = () => {
    if (route.params?.userId === user.id || route.params?.userUid === user.uid)
      return;
    navigation.push("UserProfile", {
      userId: user.id,
    });
  };
  const navigateToFollowers = () =>
    navigation.push("UserFollowers", {
      userId: user.id,
    });
  const navigateToFollowings = () =>
    navigation.push("UserFollowings", {
      userId: user.id,
    });

  return (
    <View style={styles.container}>
      <View style={styles.userTopSection}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: user.profile?.bannerUrl,
          }}
          style={[
            styles.userBanner,
            {
              backgroundColor: user.profile?.bannerUrl,
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: user.profile?.avatarUrl,
                width: 64,
                height: 64,
              }}
              style={styles.avatar}
            />
          </View>
        </ImageBackground>
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
            <View>
              {me?.id === user.id ? (
                <MyButton
                  size="tiny"
                  color="secondary"
                  onPress={navigateToEditUser}
                >
                  {t("button.edit")}
                </MyButton>
              ) : (
                <MyButton
                  size="tiny"
                  isLoading={followLoading}
                  color={user.followingStatus ? "danger" : "primary"}
                  onPress={followUserHandler}
                >
                  {FollowButtonText}
                </MyButton>
              )}
            </View>
          </View>
          <View style={styles.userFollowInfoContainer}>
            <TouchableOpacity
              style={styles.userFollowInfoItem}
              onPress={navigateToFollowers}
            >
              <Text style={styles.userFollowInfoCount}>
                {user.followersCount}
              </Text>
              <Text style={styles.userFollowInfoText}>
                {user.followersCount === 1
                  ? t("user.one_follower")
                  : t("user.x_followers")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.userFollowInfoItem, { marginLeft: 18 }]}
              onPress={navigateToFollowings}
            >
              <Text style={styles.userFollowInfoCount}>
                {user.followingsCount}
              </Text>
              <Text style={styles.userFollowInfoText}>
                {user.followingsCount === 1
                  ? t("user.one_following")
                  : t("user.x_followings")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!!user.profile?.bio && (
        <View style={styles.userProfileBioContainer}>
          <Text style={styles.userProfileBio}>
            {useRichBodyText(user.profile?.bio)}
          </Text>
        </View>
      )}
      <View style={styles.additionalUserInfoContainer}>
        <View style={styles.additionalInfoItem}>
          <AntDesign name="calendar" size={14} color={colors.primary600} />
          <Text
            style={[
              styles.additionalInfoItemText,
              { color: colors.primary600 },
            ]}
          >
            {t("user.joined")}:{" "}
            <Text style={styles.additionalInfoItemTextValue}>
              {dayjs(parseFloat(user.createdAt)).format("MMMM YYYY")}
            </Text>
          </Text>
        </View>
        {user.profile?.showBirthdate && (
          <View
            style={[
              styles.additionalInfoItem,
              styles.additionalInfoItemNotFirst,
            ]}
          >
            <MaterialCommunityIcons
              name="cake-variant"
              size={14}
              color={colors.info}
            />
            <Text
              style={[styles.additionalInfoItemText, { color: colors.info }]}
            >
              {t("user.birthday")}:{" "}
              <Text style={styles.additionalInfoItemTextValue}>
                {dayjs(parseFloat(user.profile.birthdate)).format(
                  "MMM DD YYYY"
                )}
              </Text>
            </Text>
          </View>
        )}
        {!!user.profile?.location && (
          <View
            style={[
              styles.additionalInfoItem,
              styles.additionalInfoItemNotFirst,
            ]}
          >
            <Entypo name="location" size={14} color={colors.accentWashedOut} />
            <Text
              style={[
                styles.additionalInfoItemText,
                { color: colors.accentWashedOut },
              ]}
            >
              <Text style={styles.additionalInfoItemTextValue}>
                {user.profile.location}
              </Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary200,
  },
  userTopSection: {
    flexDirection: "column",
  },
  userBanner: {
    width: "100%",
  },
  avatarContainer: {
    padding: 16,
    height: 124,
    position: "relative",
  },
  avatar: {
    position: "absolute",
    borderRadius: 100 / 2,
    backgroundColor: colors.primary300,
    borderWidth: 3,
    borderColor: colors.primary100,
    bottom: -30,
    left: 15,
  },
  userContainer: {
    flexDirection: "column",
    padding: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary200,
  },
  userContainerTopSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userNameContainer: {
    marginTop: 22,
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
    fontSize: fontSize.md,
    color: colors.primary700,
  },
  followsYouContainer: {
    marginLeft: 6,
    marginTop: 2,
    backgroundColor: colors.primary200,
    borderRadius: radius.s,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  followsYouText: {
    color: colors.primary450,
    fontSize: fontSize.small,
    fontWeight: "700",
  },
  userFollowInfoContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  userFollowInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  userFollowInfoCount: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.inter.bold,
    color: colors.primary700,
  },
  userFollowInfoText: {
    fontSize: fontSize.md,
    marginLeft: 6,
    color: colors.primary600,
  },
  userProfileBioContainer: {
    padding: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary200,
  },
  userProfileBio: {
    color: colors.primary600,
    ...paragraph,
  },
  additionalUserInfoContainer: {
    padding: 14,
  },
  additionalInfoItemNotFirst: {
    marginTop: 6,
  },
  additionalInfoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  additionalInfoItemText: {
    marginLeft: 6,
    color: colors.primary600,
    fontSize: fontSize.md,
  },
  additionalInfoItemTextValue: {
    fontFamily: fontFamily.inter.bold,
  },
});
