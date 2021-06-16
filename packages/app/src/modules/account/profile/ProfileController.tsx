import { useLogoutMutation } from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import * as WebBrowser from "expo-web-browser";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import processString from "react-process-string";
import { MyButton } from "../../../components/MyButton";
import { UserCard } from "../../../components/UserCard";
import {
  colors,
  fontFamily,
  fontSize,
  h5,
  paragraph,
  small,
} from "../../../constants/style";
import { ProfileNavProps } from "../../../navigation/AppTabs/Stacks/Profile/ParamList";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../../auth/AuthProvider";

export const ProfileController: React.FC<any> = ({
  navigation,
}: ProfileNavProps<"Profile">) => {
  const { me } = useContext(AuthContext);
  const { t } = useTypeSafeTranslation();

  const [logout, { client, loading: logoutLoading }] = useLogoutMutation();
  const logoutHandler = async () => {
    const { data } = await logout();
    if (data?.logout) {
      client.resetStore();
    }
  };

  if (!me) return null;
  return (
    <ScrollView style={{ flex: 1 }}>
      <UserCard user={me} key={`myprofile:${me.id}`} />
      <View style={styles.userSection}>
        <Text style={styles.gravatarInfoText}>
          {processString([
            {
              regex: /@(.*)@/,
              fn: (key: any, res: any) => (
                <Text
                  key={key}
                  style={styles.gravatarLinkText}
                  onPress={() =>
                    WebBrowser.openBrowserAsync(
                      "https://en.gravatar.com/support/what-is-gravatar/"
                    )
                  }
                >
                  {res[1]}
                </Text>
              ),
            },
          ])(t("my_account.gravatar_info"))}
        </Text>
        <View style={styles.buttonsContainer}>
          <MyButton
            size="medium"
            onPress={() =>
              navigation.navigate("UserProfile", {
                userId: me.id,
              })
            }
            color="accent"
          >
            {t("my_account.my_profile")}
          </MyButton>
          <View style={styles.buttonWrapperNotFirst}>
            <MyButton
              size="medium"
              onPress={() => navigation.navigate("Settings")}
              color="secondary"
            >
              {t("my_account.settings")}
            </MyButton>
          </View>
          <View style={styles.buttonWrapperNotFirst}>
            <MyButton
              size="medium"
              color="primary"
              onPress={logoutHandler}
              isLoading={logoutLoading}
            >
              {t("my_account.sign_out")}
            </MyButton>
          </View>
        </View>
      </View>
      <View style={styles.privateInfoContainer}>
        <View>
          <Text style={styles.privInfoHeading}>
            {t("my_account.private_info")}
          </Text>
          <Text style={styles.privInfoSubtext}>
            {t("my_account.private_info_subtext")}
          </Text>
        </View>
        <View style={styles.privActualInfoContainer}>
          <View style={styles.privActualInfoItem}>
            <Text style={styles.privActualInfoItemLabel}>
              {t("my_account.email")}:
            </Text>
            <Text style={styles.privActualInfoItemValue}>{me.email}</Text>
          </View>
          <View style={styles.privActualInfoItem}>
            <Text style={styles.privActualInfoItemLabel}>
              {t("my_account.date_of_birth")}:
            </Text>
            <Text style={styles.privActualInfoItemValue}>
              {dayjs(parseFloat(me.profile?.birthdate || "0")).format(
                "MMM DD YYYY"
              )}
            </Text>
          </View>
          <View style={styles.privActualInfoItem}>
            <Text style={styles.privActualInfoItemLabel}>
              {t("my_account.created_date")}:
            </Text>
            <Text style={styles.privActualInfoItemValue}>
              {dayjs(parseFloat(me.createdAt)).format(
                "MMMM DD YYYY, h:mm:ss a"
              )}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.deleteAccountContainer}>
        <View style={styles.deleteAccButtonContainer}>
          <MyButton size="medium" onPress={() => {}} color="danger">
            {t("my_account.delete_account")}
          </MyButton>
        </View>
        <Text style={styles.deleteAccText}>
          {t("my_account.delete_account_subtext")}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userSection: {
    padding: 14,
  },
  gravatarInfoText: {
    color: colors.primary600,
    fontSize: fontSize.small,
    fontFamily: fontFamily.inter.medium,
  },
  gravatarLinkText: {
    color: colors.accent,
    fontFamily: fontFamily.inter.bold,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 14,
    flexWrap: "wrap",
  },
  buttonWrapperNotFirst: {
    marginLeft: 6,
  },
  privateInfoContainer: {
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    padding: 14,
  },
  privInfoHeading: {
    ...h5,
    lineHeight: 20,
    fontFamily: fontFamily.inter.bold,
    color: colors.primary800,
  },
  privInfoSubtext: {
    ...small,
    fontWeight: "700",
    color: colors.primary600,
  },
  privActualInfoContainer: {
    marginTop: 8,
  },
  privActualInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  privActualInfoItemLabel: {
    fontWeight: "bold",
    color: colors.primary800,
    marginRight: 6,
  },
  privActualInfoItemValue: {
    color: colors.primary700,
  },
  deleteAccountContainer: {
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    padding: 14,
  },
  deleteAccButtonContainer: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  deleteAccText: {
    ...small,
    color: colors.primary500,
  },
});
