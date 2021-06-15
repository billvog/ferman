import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { TextStyle } from "react-native";
import { colors } from "../constants/style";

interface Props {
  style?: TextStyle;
  selected: boolean;
}

const size = 20;

export const Checkbox: React.FC<Props> = ({ selected, style }) => {
  return selected ? (
    <MaterialCommunityIcons
      style={[style, { height: size }]}
      color={colors.accentHover}
      size={size}
      name="checkbox-marked"
    />
  ) : (
    <MaterialCommunityIcons
      style={[style, { height: size }]}
      size={size}
      color={colors.accentHover}
      name="checkbox-blank-outline"
    />
  );
};
