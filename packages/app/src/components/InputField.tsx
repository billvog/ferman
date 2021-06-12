import { FieldProps } from "formik";
import React from "react";
import { StyleProp, Text, TextInput, TextStyle, View } from "react-native";
import { colors, fontSize, radius } from "../constants/style";

type InputFieldProps = FieldProps<any> & {
  placeholder?: string;
};

const errorStyle: StyleProp<TextStyle> = {
  color: colors.error,
  fontSize: fontSize.paragraph,
  fontWeight: "600",
  marginTop: 3,
};

const fieldStyle: StyleProp<TextStyle> = {
  position: "relative",
  width: "100%",
  borderWidth: 0,
  paddingHorizontal: 10,
  paddingVertical: 8,
  backgroundColor: colors.primary200,
  borderRadius: radius.m,
  fontSize: fontSize.paragraph,
  fontWeight: "600",
  color: colors.primary600,
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { field, form, placeholder } = props;

  const errorMsg = form.touched[field.name] && form.errors[field.name];

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
      {!!errorMsg && <Text style={errorStyle}>{errorMsg}</Text>}
    </View>
  );
};
