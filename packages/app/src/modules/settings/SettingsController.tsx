import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fontSize } from "../../constants/style";
import { ProfileNavProps } from "../../navigation/AppTabs/Stacks/Profile/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Setting } from "./Setting";

export const SettingsController: React.FC<any> = ({
  navigation,
}: ProfileNavProps<"Settings">) => {
  const { t } = useTypeSafeTranslation();
  return (
    <ScrollView>
      <View style={styles.settingsContainer}>
        <Setting
          icon={
            <Ionicons
              name="globe-outline"
              size={18}
              color={colors.primary600}
            />
          }
          label={t("settings.language.text")}
          onPress={() => navigation.navigate("ChangeLanguage")}
        />
        <Setting
          icon={
            <FontAwesome5 name="bell" size={18} color={colors.primary600} />
          }
          label={t("settings.notifications.text")}
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: "column",
  },
});
