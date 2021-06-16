import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { localeOptions } from "../../../../../controller/dist";
import { colors, fontSize } from "../../../constants/style";

export const LanguageController: React.FC<any> = ({}) => {
  const { i18n } = useTranslation();

  const changeLocale = async (l: string) => {
    await AsyncStorage.setItem("language", l);
    i18n.changeLanguage(l);
    dayjs.locale(l);
  };

  return (
    <ScrollView style={styles.languagesContainer}>
      {localeOptions.map((option) => (
        <TouchableOpacity
          key={`lang:${option.value}`}
          style={styles.langItemContainer}
          onPress={() => changeLocale(option.value)}
        >
          <View style={styles.langItem}>
            <Text style={styles.langItemIcon}>{option.flag}</Text>
            <Text style={styles.langItemText}>{option.label}</Text>
          </View>
          {option.value === i18n.language && (
            <View>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.accentWashedOut}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  languagesContainer: {
    flexDirection: "column",
  },
  langItemContainer: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: colors.primary200,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  langItemIcon: {
    marginRight: 9,
  },
  langItemText: {
    fontSize: fontSize.paragraph,
    fontWeight: "600",
    color: colors.primary600,
  },
});
