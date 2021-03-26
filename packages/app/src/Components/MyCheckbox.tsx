import { Body, CheckBox, Content } from "native-base";
import React from "react";
import { Text, View } from "react-native";
import { FormStyles } from "../Styles/Form";

type MyCheckboxProps = React.ComponentProps<typeof CheckBox> & {
  label: string;
  helperText?: string;
};

export const MyCheckbox: React.FC<MyCheckboxProps> = ({
  label,
  helperText,
  ...props
}) => {
  return (
    <View style={[FormStyles.FormControl]}>
      <Text style={FormStyles.InputLabel}>{label}</Text>
      <View
        style={{
          transform: [{ translateX: -8 }],
        }}
      >
        <CheckBox {...props} style={FormStyles.Checkbox} />
      </View>
      {helperText && (
        <Text style={[FormStyles.HelperText, { marginBottom: 5 }]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};
