import DateTimePicker from "@react-native-community/datetimepicker";
import i18n from "i18next";
import React from "react";
import { Platform } from "react-native";

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const MyDatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <DateTimePicker
      value={value}
      onChange={(_: any, selectedDate: any) => {
        const currentDate = selectedDate || value;
        onChange(currentDate);
      }}
      mode="date"
      display={Platform.OS === "ios" ? "inline" : "default"}
      locale={i18n.language}
    />
  );
};
