import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const SearchTips: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{t("search.search_tips.heading")}</Text>
      <View style={styles.tipsList}>
        <Text style={styles.tipItemText}>
          - {t("search.search_tips.tip_1")}
        </Text>
        <Text style={styles.tipItemText}>
          - {t("search.search_tips.tip_2")}
        </Text>
        <Text style={styles.tipItemText}>
          - {t("search.search_tips.tip_3")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    fontSize: fontSize.small,
    color: colors.primary700,
    flexDirection: "column",
  },
  headingText: {
    fontFamily: fontFamily.inter.bold,
    fontSize: fontSize.h6,
    color: colors.primary700,
    marginBottom: 6,
  },
  tipsList: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  tipItemText: {
    marginBottom: 3,
    fontSize: fontSize.md,
    fontFamily: fontFamily.inter.medium,
    color: colors.primary600,
  },
});
