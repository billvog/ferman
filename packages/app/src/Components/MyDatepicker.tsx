import React from "react";
import { Text, View } from "react-native";
import { FormStyles } from "../Styles/Form";
import DatePicker from "@react-native-community/datetimepicker";

type MyDatepickerProps = React.ComponentProps<typeof DatePicker> & {
  label: string;
  helperText?: string;
  error?: string;
};

export const MyDatepicker: React.FC<MyDatepickerProps> = ({
  label,
  helperText,
  error,
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
        <DatePicker {...props} style={FormStyles.Datepicker} />
      </View>
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
