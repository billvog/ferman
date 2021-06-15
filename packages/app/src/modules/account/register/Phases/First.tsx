import DateTimePicker from "@react-native-community/datetimepicker";
import { Field } from "formik";
import React from "react";
import { View } from "react-native";
import { InputField } from "../../../../components/InputField";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { fieldStyles } from "../fieldStyles";

export const FirstPhase: React.FC = ({}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <>
      <View style={fieldStyles.fieldSeperator}>
        <Field
          name="uid"
          placeholder={t("form.placeholder.uid")}
          autoCapitalize="none"
          autoCompleteType="none"
          component={InputField}
        />
      </View>
      <View style={fieldStyles.fieldSeperator}>
        <Field
          name="username"
          placeholder={t("form.placeholder.username")}
          autoCapitalize="none"
          autoCompleteType="username"
          component={InputField}
        />
      </View>
      <View style={fieldStyles.fieldSeperator}>
        <Field
          name="email"
          placeholder={t("form.placeholder.email")}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          component={InputField}
        />
      </View>
      <View style={fieldStyles.fieldSeperator}>
        <DateTimePicker mode="date" display="default" />
        <Field
          name="password"
          placeholder={t("form.placeholder.password")}
          secureTextEntry={true}
          component={InputField}
        />
      </View>
    </>
  );
};
