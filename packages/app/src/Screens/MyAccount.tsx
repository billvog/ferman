import { useApolloClient } from "@apollo/client";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { UserCard } from "../Components/UserCard";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { MyAccountNavProps } from "../Types/MyAccountParamList";

export const MyAccount = ({ navigation }: MyAccountNavProps<"MyAccount">) => {
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading } = useMeQuery();
  const [logoutUser] = useLogoutMutation();

  return (
    <Layout container>
      {meLoading ? (
        <ActivityIndicator color="grey" />
      ) : !meData || !meData.me ? (
        <ErrorText>Internal server error</ErrorText>
      ) : (
        <>
          <UserCard
            user={meData.me}
            me={meData.me}
            full
            showEdit
            onEdit={() => navigation.navigate("EditProfile")}
            onPress={() =>
              navigation.navigate("User", { userId: meData.me!.id })
            }
          />
          <View style={styles.Container}>
            <TouchableOpacity
              style={styles.SignOutButton}
              onPress={async () => {
                const { data } = await logoutUser();

                if (!data || !data.logout) {
                  return Alert.alert("Failed", "Internal server error");
                }

                await apolloClient.resetStore();
              }}
            >
              <Text style={styles.SignOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  Container: {},
  SignOutButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "indianred",
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  SignOutButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
