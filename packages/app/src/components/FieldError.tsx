import i18n from "i18next";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { colors, fontSize, paragraph, small } from "../constants/style";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface FieldErrorProps {
  error: string | null;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  const { t } = useTypeSafeTranslation();
  return !!error &&
    (i18n.exists(`form.error.${error}`) || i18n.exists(error as any)) ? (
    <Text style={errorStyle}>
      {i18n.exists(`form.error.${error}`)
        ? t(`form.error.${error}` as any)
        : t(error as any)}
    </Text>
  ) : null;
};

const errorStyle: StyleProp<TextStyle> = {
  ...small,
  color: colors.error,
  fontWeight: "700",
  marginTop: 4,
};
