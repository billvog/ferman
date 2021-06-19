import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, fontSize } from "../../constants/style";

interface SettingProps {
  onPress: () => void;
  icon: JSX.Element;
  label: string;
}

export const Setting: React.FC<SettingProps> = ({ onPress, icon, label }) => {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemIcon}>{icon}</View>
      <Text style={styles.settingItemText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: colors.primary200,
  },
  settingItemIcon: {
    marginRight: 12,
  },
  settingItemText: {
    fontSize: fontSize.paragraph,
    fontWeight: "600",
    color: colors.primary600,
  },
});
