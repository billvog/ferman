import { useLogoutMutation } from "@ferman-pkgs/controller";
import React from "react";
import { useContext } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { MyButton } from "../../../components/MyButton";
import { AuthContext } from "../../auth/AuthProvider";

export const ProfileController: React.FC = ({}) => {
  const { me } = useContext(AuthContext);
  const [logout, { client, loading: logoutLoading }] = useLogoutMutation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginBottom: 12,
        }}
      >
        Your are logged in as {me?.uid}
      </Text>
      <MyButton
        onPress={async () => {
          const { data } = await logout();
          if (data?.logout) {
            client.resetStore();
          }
        }}
        title="Logout"
        isLoading={logoutLoading}
      />
    </View>
  );
};
