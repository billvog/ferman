import React from "react";
import { useField } from "formik";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FieldError } from "../components/FieldError";
import { MyButton } from "../components/MyButton";
import i18next from "i18next";
import dayjs from "dayjs";

interface TextFieldProps {
  name: string;
  label: string;
}

export const DatePickerField: React.FC<TextFieldProps> = ({ name, label }) => {
  const [open, setOpen] = React.useState(false);
  const [field, meta, { setValue }] = useField({ name });
  return (
    <View>
      <MyButton onPress={() => setOpen(true)}>
        {label}
        {!!field.value && `: ${dayjs(field.value).format("MMM DD YYYY")}`}
      </MyButton>
      <DateTimePickerModal
        date={!!field.value ? new Date(field.value) : new Date(0)}
        isVisible={open}
        mode="date"
        onConfirm={(dt) => {
          setValue(dt);
          setOpen(false);
        }}
        locale={i18next.language}
        onCancel={() => setOpen(false)}
      />
      {meta.error ? <FieldError error={meta.error as string} /> : null}
    </View>
  );
};
