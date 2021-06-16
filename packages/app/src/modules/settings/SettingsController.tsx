import { Ionicons } from "@expo/vector-icons";
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

export const SettingsController: React.FC<any> = ({
  navigation,
}: ProfileNavProps<"Settings">) => {
  const { t } = useTypeSafeTranslation();
  return (
    <ScrollView>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => navigation.navigate("ChangeLanguage")}
        >
          <View style={styles.settingsItemIcon}>
            <Ionicons
              name="globe-outline"
              size={18}
              color={colors.primary600}
            />
          </View>
          <Text style={styles.settingsItemText}>
            {t("settings.language.text")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: "column",
  },
  settingsItem: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: colors.primary200,
  },
  settingsItemIcon: {
    marginRight: 9,
  },
  settingsItemText: {
    fontSize: fontSize.paragraph,
    fontWeight: "600",
    color: colors.primary600,
  },
});
