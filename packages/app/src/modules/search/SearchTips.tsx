import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const SearchTips: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const listDotIcon = (
    <Entypo name="dot-single" size={18} color={colors.accentWashedOut} />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>{t("search.search_tips.heading")}</Text>
      <View style={styles.tipsList}>
        <View style={styles.tipItem}>
          {listDotIcon}
          <Text style={styles.tipItemText}>
            {t("search.search_tips.tip_1")}
          </Text>
        </View>
        <View style={styles.tipItem}>
          {listDotIcon}
          <Text style={styles.tipItemText}>
            {t("search.search_tips.tip_2")}
          </Text>
        </View>
        <View style={styles.tipItem}>
          {listDotIcon}
          <Text style={styles.tipItemText}>
            {t("search.search_tips.tip_3")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
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
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipItemText: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.inter.medium,
    color: colors.primary600,
  },
});
