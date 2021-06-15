import { useLogoutMutation } from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { MyButton } from "../../../components/MyButton";
import { UserCard } from "../../../components/UserCard";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../../auth/AuthProvider";

export const ProfileController: React.FC = ({}) => {
  const { me } = useContext(AuthContext);
  const { t } = useTypeSafeTranslation();

  const [logout, { client, loading: logoutLoading }] = useLogoutMutation();

  if (!me) return null;

  return (
    <View>
      <UserCard user={me} key={`myprofile:${me.id}`} />
      <View>
        <Text>{t("my_account.gravatar_info")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
