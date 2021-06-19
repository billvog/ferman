import { useField } from "formik";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors, fontFamily } from "../constants/style";
import { Checkbox } from "../components/Checkbox";

interface MyCheckboxProps {
  name: string;
  label: string;
}

export const CheckboxWithLabel: React.FC<MyCheckboxProps> = ({
  name,
  label,
}) => {
  const [field, _, form] = useField({ name });
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "flex-start" }}
      onPress={() => form.setValue(!field.value)}
    >
      <Checkbox selected={field.value} />
      <Text
        style={{
          flex: 1,
          flexWrap: "wrap",
          marginLeft: 6,
          fontFamily: fontFamily.inter.medium,
          color: colors.primary700,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
