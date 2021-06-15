import {
  RegisterFourValidationSchema,
  RegisterOneValidationSchema,
  RegisterThreeValidationSchema,
  RegisterTwoValidationSchema,
} from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  RegisterFormValues,
  RegisterPhase,
} from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Field, Formik } from "formik";
import i18n from "i18next";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MyDatePicker } from "../../../components/DatePicker";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { colors, fontFamily, radius, xsmall } from "../../../constants/style";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { fieldStyles } from "./fieldStyles";

interface RegisterViewProps {
  storedInitialValues?: RegisterFormValues;
  submit: (values: RegisterFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
  phase: RegisterPhase;
  done: boolean;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  storedInitialValues,
  submit,
  message,
  phase,
  done,
}) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headertTitle:
        phase === 0
          ? t("register.phase.sign_up")
          : phase === 1
          ? t("register.phase.verify")
          : phase === 2
          ? t("register.phase.set_password")
          : phase === 3
          ? t("register.phase.everything_alright")
          : "",
    });
  }, [phase]);

  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const onDatePickerFieldClick = () => {
    setDatePickerIsOpen(!datePickerIsOpen);
  };

  return (
    <View
      style={{
        marginHorizontal: 12,
        marginVertical: 14,
      }}
    >
      <Formik
        validationSchema={() =>
          phase === 0
            ? RegisterOneValidationSchema
            : phase === 1
            ? RegisterTwoValidationSchema
            : phase === 2
            ? RegisterThreeValidationSchema
            : phase === 3
            ? RegisterFourValidationSchema
            : null
        }
        initialValues={{
          uid: storedInitialValues?.uid || "",
          username: storedInitialValues?.username || "",
          email: storedInitialValues?.email || "",
          birthdate: storedInitialValues?.birthdate || "",
          code: storedInitialValues?.code || "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const errors = await submit(values);
          if (errors) setErrors(errors);
        }}
      >
        {({ submitForm, isSubmitting, setFieldValue, values }) => (
          <>
            {!!message && i18n.exists(message.text) && (
              <View style={fieldStyles.fieldSeperator}>
                <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
              </View>
            )}
            {phase === 0 ? (
              <>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="uid"
                    placeholder={t("form.placeholder.uid")}
                    autoCapitalize="none"
                    component={InputField}
                  />
                  <Text style={styles.helperText}>{t("form.helper.uid")}</Text>
                </View>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="username"
                    placeholder={t("form.placeholder.username")}
                    autoCapitalize="none"
                    component={InputField}
                  />
                  <Text style={styles.helperText}>
                    {t("form.helper.username")}
                  </Text>
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
                  <TouchableOpacity
                    onPress={onDatePickerFieldClick}
                    style={styles.birthdateField}
                  >
                    <Text style={styles.birthdateFieldLabel}>
                      {t("user.birthday")}:
                    </Text>
                    <Text style={styles.birthdateFieldValue}>
                      {dayjs(values.birthdate || 0).format("MMM DD YYYY")}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.helperText}>
                    {t("form.helper.date_of_birth")}
                  </Text>
                  {datePickerIsOpen && (
                    <View style={{ marginTop: 20 }}>
                      <MyDatePicker
                        value={new Date(values.birthdate || 0)}
                        onChange={(date) => {
                          setFieldValue("birthdate", date);
                        }}
                      />
                    </View>
                  )}
                </View>
              </>
            ) : phase === 1 ? (
              <>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="code"
                    placeholder={t("form.placeholder.six_digit")}
                    autoCapitalize="none"
                    autoCompleteType="none"
                    component={InputField}
                  />
                  <Text style={styles.helperText}>
                    {t("form.helper.six_digit")}
                  </Text>
                </View>
              </>
            ) : phase === 2 ? (
              <>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    secureTextEntry={true}
                    component={InputField}
                  />
                </View>
              </>
            ) : phase === 3 ? (
              <>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="uid"
                    placeholder={t("form.placeholder.uid")}
                    autoCapitalize="none"
                    component={InputField}
                  />
                  <Text style={styles.helperText}>{t("form.helper.uid")}</Text>
                </View>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="username"
                    placeholder={t("form.placeholder.username")}
                    autoCapitalize="none"
                    component={InputField}
                  />
                  <Text style={styles.helperText}>
                    {t("form.helper.username")}
                  </Text>
                </View>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="email"
                    placeholder={t("form.placeholder.email")}
                    editable={false}
                    component={InputField}
                  />
                </View>
                <View style={fieldStyles.fieldSeperator}>
                  <TouchableOpacity
                    onPress={onDatePickerFieldClick}
                    style={styles.birthdateField}
                  >
                    <Text style={styles.birthdateFieldLabel}>
                      {t("user.birthday")}:
                    </Text>
                    <Text style={styles.birthdateFieldValue}>
                      {dayjs(values.birthdate || 0).format("MMM DD YYYY")}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.helperText}>
                    {t("form.helper.date_of_birth")}
                  </Text>
                  {datePickerIsOpen && (
                    <View style={{ marginTop: 20 }}>
                      <MyDatePicker
                        value={new Date(values.birthdate || 0)}
                        onChange={(date) => {
                          setFieldValue("birthdate", date);
                        }}
                      />
                    </View>
                  )}
                </View>
                <View style={fieldStyles.fieldSeperator}>
                  <Field
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    secureTextEntry={true}
                    component={InputField}
                  />
                </View>
              </>
            ) : null}
            <View style={styles.submitSection}>
              <MyButton
                title={phase >= 3 ? t("button.finish") : t("button.continue")}
                style="secondary"
                isLoading={isSubmitting}
                onPress={submitForm}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  submitSection: {
    alignItems: "flex-start",
    marginTop: 3,
  },
  helperText: {
    ...xsmall,
    marginTop: 5,
    marginHorizontal: 1,
    color: colors.primary450,
    fontFamily: fontFamily.inter.medium,
  },
  birthdateField: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    backgroundColor: colors.primary200,
    borderRadius: radius.m,
  },
  birthdateFieldLabel: {
    fontWeight: "700",
    color: colors.primary700,
    marginRight: 6,
  },
  birthdateFieldValue: {
    color: colors.primary600,
  },
});
