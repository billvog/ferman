import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  FullUserFragment,
  useFollowUserMutation,
  useUserQuery,
} from "../generated/graphql";
import { MAIN_DARK_BLUE } from "../Styles/Global";
import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

interface UserCardProps {
  user: FullUserFragment;
  me: FullUserFragment;
  full?: boolean;
  onPress?: () => any;
  onEdit?: () => any;
  showEdit?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  me,
  full,
  onPress,
  onEdit,
  showEdit,
}) => {
  const navigation = useNavigation();

  const [followUser] = useFollowUserMutation();
  let userFollowIcon = user.followingStatus ? (
    <AntDesign name="deleteuser" />
  ) : (
    <AntDesign name="adduser" />
  );

  return (
    <View style={styles.Container}>
      <View style={styles.TopContainer}>
        <View style={styles.TopWrapper}>
          <TouchableOpacity
            onPress={() => typeof onPress === "function" && onPress()}
          >
            <Image
              style={styles.Avatar}
              source={{
                uri: `https://www.gravatar.com/avatar/${user.emailHash}`,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.Username}>{user.username}</Text>
            <Text style={styles.Uid}>@{user.uid}</Text>
            <Text style={styles.FollowInfoContainer}>
              <Text
                onPress={() =>
                  navigation.navigate("Followers", {
                    userId: user.id,
                  })
                }
              >
                {user.followerCount} followers
              </Text>
              {" · "}
              <Text
                onPress={() =>
                  navigation.navigate("Following", {
                    userId: user.id,
                  })
                }
              >
                {user.followingCount} follows
              </Text>
            </Text>
          </View>
        </View>
        <View>
          {user.id === me.id ? (
            showEdit &&
            typeof onEdit === "function" && (
              <TouchableOpacity
                style={[styles.ActionButton, styles.EditButton]}
                onPress={() => onEdit()}
              >
                <Text style={[styles.ActionButtonText, styles.EditButtonText]}>
                  <Entypo name="edit" />
                </Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              style={[
                styles.ActionButton,
                user.followingStatus
                  ? styles.UnfollowButton
                  : styles.FollowButton,
              ]}
              onPress={async () => {
                const { data } = await followUser({
                  variables: {
                    userId: user.id,
                  },
                });

                if (!data || data.followUser.error || !data.followUser.users) {
                  Alert.alert("Failed", "Internal server error");
                }
              }}
            >
              <Text
                style={[
                  styles.ActionButtonText,
                  user.followingStatus
                    ? styles.UnfollowButtonText
                    : styles.FollowButtonText,
                ]}
              >
                {userFollowIcon} {user.followingStatus ? "Unfollow" : "Follow"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {full && (
        <View>
          {!!user.profile?.bio && (
            <View style={styles.BottomSection}>
              <Text style={styles.BioText}>{user.profile.bio}</Text>
            </View>
          )}
          <View style={styles.BottomSection}>
            <View style={styles.InformationWrapper}>
              <Text style={[styles.InfoItem, styles.JoinedDate]}>
                <AntDesign name="calendar" />
                {"  "}
                <Text>
                  Joined:{" "}
                  {moment(parseFloat(user.createdAt)).format("MMMM Do YYYY")}
                </Text>
              </Text>
              {user.id === me.id || user.id === me.id ? (
                <Text style={[styles.InfoItem, styles.Birthday]}>
                  <FontAwesome name="birthday-cake" />
                  {"  "}
                  <Text>
                    {moment(parseFloat(user.profile!.birthdate)).format(
                      "MMMM Do YYYY"
                    )}
                  </Text>
                </Text>
              ) : null}
              {!!user.profile?.location && (
                <Text style={[styles.InfoItem, styles.Location]}>
                  <Entypo name="location" />
                  {"  "}
                  <Text>{user.profile.location}</Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  TopContainer: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TopWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  Avatar: {
    width: 35,
    height: 35,
    borderRadius: 10,
    marginRight: 8,
  },
  Username: {
    color: MAIN_DARK_BLUE,
    fontWeight: "600",
    marginBottom: 2,
  },
  Uid: {
    fontSize: 12,
    color: MAIN_DARK_BLUE,
    marginBottom: 2,
  },
  FollowInfoContainer: {
    fontSize: 12,
    color: MAIN_DARK_BLUE,
  },
  ActionButton: {
    padding: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  ActionButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  EditButton: {
    backgroundColor: "#d0d0d0",
    paddingVertical: 8,
    borderRadius: 7,
  },
  EditButtonText: {
    color: MAIN_DARK_BLUE,
  },
  FollowButton: {
    backgroundColor: "cornflowerblue",
  },
  FollowButtonText: {
    color: "white",
  },
  UnfollowButton: {
    backgroundColor: "indianred",
  },
  UnfollowButtonText: {
    color: "white",
  },
  BottomSection: {
    borderTopWidth: 1,
    borderColor: "#d0d0d0",
    padding: 8,
  },
  BioText: {
    color: "dimgrey",
    fontSize: 12,
  },
  InformationWrapper: {},
  InfoItem: {
    fontSize: 12,
  },
  InfoIcon: {
    paddingLeft: 5,
  },
  JoinedDate: {
    color: "brown",
    marginBottom: 2,
  },
  Birthday: {
    color: "cornflowerblue",
  },
  Location: {
    marginTop: 2,
    color: "dimgrey",
  },
});
