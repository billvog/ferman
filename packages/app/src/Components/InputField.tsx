import { FieldHookConfig, useField } from "formik";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { FormStyles } from "../Styles/Form";

type InputFieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  helperText?: string;
  error?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  helperText,
  error,
  ...props
}) => {
  return (
    <View style={FormStyles.FormControl}>
      <Text style={FormStyles.InputLabel}>{label}</Text>
      <TextInput
        {...props}
        style={[FormStyles.InputField, !!error && FormStyles.WrongField]}
      />
      {helperText && (
        <Text style={[FormStyles.HelperText, { marginBottom: 5 }]}>
          {helperText}
        </Text>
      )}
      {!!error && (
        <Text style={[FormStyles.FieldError, { marginBottom: 5 }]}>
          {error}
        </Text>
      )}
    </View>
  );
};
