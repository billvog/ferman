import { useApolloClient } from "@apollo/client";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { UserCard } from "../Components/UserCard";
import {
  useMeQuery,
  useUserFollowersQuery,
  useUserQuery,
} from "../generated/graphql";
import { GlobalStyles } from "../Styles/Global";
import { FeedNavProps } from "../Types/FeedParamList";

export const ViewFollowers = ({
  navigation,
  route,
}: FeedNavProps<"Followers">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const { data: userData, loading: userLoading } = useUserQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: route.params.userId,
    },
  });
  const {
    data: followersData,
    loading: followersLoading,
    refetch: refetchFollowers,
  } = useUserFollowersQuery({
    notifyOnNetworkStatusChange: true,
    skip: !userData?.user,
    variables: {
      userId: userData?.user?.id || -1,
    },
  });

  React.useLayoutEffect(() => {
    if (userData?.user?.uid) {
      navigation.setOptions({
        headerTitle: userData.user.uid + "'s followers",
      });
    }
  }, [navigation, userData?.user?.uid]);

  return (
    <Layout>
      {meLoading || userLoading || (followersLoading && !followersData) ? (
        <ActivityIndicator color="grey" />
      ) : !userData?.user ? (
        <ErrorText>User not found</ErrorText>
      ) : !meData || !userData || !followersData ? (
        <ErrorText>Internal server error</ErrorText>
      ) : (
        <ScrollView
          style={GlobalStyles.Container}
          refreshControl={
            <RefreshControl
              refreshing={followersLoading || userLoading}
              onRefresh={async () => {
                apolloClient.cache.evict({ fieldName: "userFollowers" });
                await refetchFollowers();
              }}
            />
          }
        >
          <Text style={styles.FollowerCount}>
            {followersData.userFollowers?.length} follower
            {followersData.userFollowers!.length !== 1 && "s"}
          </Text>
          {followersData.userFollowers?.length === 0 ? (
            <Text style={styles.NoFollowersText}>
              <Text style={{ fontWeight: "600" }}>
                {userData.user.username}
              </Text>{" "}
              doesn't really have any followers.
            </Text>
          ) : (
            followersData.userFollowers?.map((follower) => (
              <View key={follower.id} style={{ marginBottom: 10 }}>
                <UserCard
                  me={meData.me as any}
                  user={follower}
                  onPress={() =>
                    navigation.navigate("User", { userId: follower.id })
                  }
                />
              </View>
            ))
          )}
        </ScrollView>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  FollowerCount: {
    color: "grey",
    fontSize: 12,
    marginBottom: 10,
  },
  NoFollowersText: {
    color: "dimgrey",
  },
});
