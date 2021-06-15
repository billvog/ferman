import { useField } from "formik";
import React from "react";
import { Text, View } from "react-native";
import { FieldError } from "../components/FieldError";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";

interface CheckboxFieldProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, { setValue }] = useField({ name });
  return (
    <View>
      <View style={{ marginBottom: 8 }}>
        <Text>{label}</Text>
      </View>
      <View style={{ flexDirection: "row", width: "100%" }}>
        {options.map((o, i) => (
          <View
            key={o.value}
            style={{
              marginLeft: i ? 10 : 0,
            }}
          >
            <CheckboxWithLabel
              label={o.label}
              checked={field.value.includes(o.value)}
              big
              onPress={() => {
                if (field.value.includes(o.value)) {
                  setValue(field.value.filter((x: string) => x !== o.value));
                } else {
                  setValue([...field.value, o.value]);
                }
              }}
            />
          </View>
        ))}
      </View>
      {meta.error ? <FieldError error={meta.error} /> : null}
    </View>
  );
};
