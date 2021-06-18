import { FieldProps } from "formik";
import React from "react";
import { Platform, StyleProp, TextInput, TextStyle, View } from "react-native";
import { colors, fontSize, radius } from "../constants/style";
import { FieldError } from "../components/FieldError";
import { FieldHelper } from "../components/FieldHelper";

type InputFieldProps = FieldProps<any> & {
  placeholder?: string;
  helperText?: string | JSX.Element;
  extraStyles?: StyleProp<TextStyle>;
};

export const fieldStyle: StyleProp<TextStyle> = {
  position: "relative",
  width: "100%",
  borderWidth: 0,
  paddingHorizontal: Platform.OS === "android" ? 14.5 : 10,
  paddingVertical: Platform.OS === "android" ? 6 : 9,
  backgroundColor: colors.primary200,
  borderRadius: radius.m,
  fontSize: fontSize.paragraph,
  fontWeight: "600",
  color: colors.primary600,
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const { field, form, placeholder } = props;
  const error = form.touched[field.name] && form.errors[field.name];
  const onChangeText = (text: string) => {
    form.setFieldValue(field.name, text);
  };

  return (
    <View>
      <TextInput
        {...props}
        style={[fieldStyle, props.extraStyles]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={field.value}
        selectionColor={colors.accentWashedOut}
      />
      {!!props.helperText && <FieldHelper>{props.helperText}</FieldHelper>}
      <FieldError error={error as string} />
    </View>
  );
};
