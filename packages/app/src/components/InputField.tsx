import { FieldProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { colors, fontSize, radius } from "../constants/style";
import { Platform } from "react-native";

type InputFieldProps = FieldProps<any> & {
  placeholder?: string;
};

const errorStyle: StyleProp<TextStyle> = {
  color: colors.error,
  fontSize: fontSize.paragraph,
  fontWeight: "600",
  marginTop: 4,
};

export const fieldStyle: StyleProp<TextStyle> = {
  position: "relative",
  width: "100%",
  borderWidth: 0,
  paddingHorizontal: Platform.OS === "android" ? 16 : 10,
  paddingVertical: 8,
  backgroundColor: colors.primary200,
  borderRadius: radius.m,
  fontSize: fontSize.paragraph,
  fontWeight: "600",
  color: colors.primary600,
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();

  const { field, form, placeholder } = props;
  const error = form.touched[field.name] && form.errors[field.name];
  const onChangeText = (text: string) => {
    form.setFieldValue(field.name, text);
  };

  return (
    <View>
      <TextInput
        {...props}
        style={fieldStyle}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={field.value}
      />
      {!!error &&
        (i18n.exists(`form.error.${error}`) || i18n.exists(error as any)) && (
          <Text style={errorStyle}>
            {i18n.exists(`form.error.${error}`)
              ? t(`form.error.${error}` as any)
              : t(error as any)}
          </Text>
        )}
    </View>
  );
};
