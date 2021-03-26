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
  useFollowingUsersQuery,
  useMeQuery,
  useUserQuery,
} from "../generated/graphql";
import { GlobalStyles } from "../Styles/Global";
import { FeedNavProps } from "../Types/FeedParamList";

export const ViewFollows = ({
  navigation,
  route,
}: FeedNavProps<"Following">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const { data: userData, loading: userLoading } = useUserQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: route.params.userId,
    },
  });
  const {
    data: followsData,
    loading: followsLoading,
    refetch: refetchFollows,
  } = useFollowingUsersQuery({
    notifyOnNetworkStatusChange: true,
    skip: !userData?.user?.id,
    variables: {
      userId: userData?.user?.id || -1,
    },
  });

  React.useLayoutEffect(() => {
    if (userData?.user?.uid) {
      navigation.setOptions({
        headerTitle: userData.user.uid + "'s follows",
      });
    }
  }, [navigation, userData?.user?.uid]);

  return (
    <Layout>
      {meLoading || userLoading || (followsLoading && !followsData) ? (
        <ActivityIndicator color="grey" />
      ) : !userData?.user ? (
        <ErrorText>User not found</ErrorText>
      ) : !meData || !userData || !followsData ? (
        <ErrorText>Internal server error</ErrorText>
      ) : (
        <ScrollView
          style={GlobalStyles.Container}
          refreshControl={
            <RefreshControl
              refreshing={followsLoading || userLoading}
              onRefresh={async () => {
                apolloClient.cache.evict({ fieldName: "followingUsers" });
                await refetchFollows();
              }}
            />
          }
        >
          <Text
            style={{
              color: "grey",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            {followsData.followingUsers?.length} follow
            {followsData.followingUsers!.length !== 1 && "s"}
          </Text>
          {followsData.followingUsers?.length === 0 ? (
            <Text style={styles.NoFollowersText}>
              <Text style={{ fontWeight: "600" }}>
                {userData.user.username}
              </Text>{" "}
              doesn't really follow anyone.
            </Text>
          ) : (
            followsData.followingUsers?.map((follow) => (
              <View key={follow.id} style={{ marginBottom: 10 }}>
                <UserCard
                  user={follow}
                  me={meData.me!}
                  onPress={() =>
                    navigation.navigate("User", { userId: follow.id })
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
