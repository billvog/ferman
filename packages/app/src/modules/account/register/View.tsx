import {
  RegisterFourValidationSchema,
  RegisterOneValidationSchema,
  RegisterThreeValidationSchema,
  RegisterTwoValidationSchema,
  UidMax,
  UsernameMax,
} from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  RegisterFormValues,
  RegisterPhase,
} from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { Field, Formik } from "formik";
import i18n from "i18next";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { DatePickerField } from "../../../components/DatePickerField";
import { FormSpacer } from "../../../components/FormSpacer";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
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
      headerTitle:
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

  return (
    <KeyboardAvoidingView
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
        {({ submitForm, isSubmitting }) => (
          <>
            {!!message && i18n.exists(message.text) && (
              <View style={fieldStyles.fieldSeperator}>
                <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
              </View>
            )}
            {phase === 0 ? (
              <>
                <FormSpacer>
                  <Field
                    name="uid"
                    placeholder={t("form.placeholder.uid")}
                    autoCapitalize="none"
                    helperText={t("form.helper.uid")}
                    maxLength={UidMax}
                    component={InputField}
                  />
                </FormSpacer>
                <FormSpacer>
                  <Field
                    name="username"
                    placeholder={t("form.placeholder.username")}
                    autoCapitalize="none"
                    helperText={t("form.helper.username")}
                    maxLength={UsernameMax}
                    component={InputField}
                  />
                </FormSpacer>
                <FormSpacer>
                  <Field
                    name="email"
                    placeholder={t("form.placeholder.email")}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    component={InputField}
                  />
                </FormSpacer>
                <FormSpacer>
                  <DatePickerField
                    label={t("user.birthday")}
                    name="birthdate"
                  />
                </FormSpacer>
              </>
            ) : phase === 1 ? (
              <>
                <FormSpacer>
                  <Field
                    name="code"
                    placeholder={t("form.placeholder.six_digit")}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    helperText={t("form.helper.six_digit")}
                    component={InputField}
                  />
                </FormSpacer>
              </>
            ) : phase === 2 ? (
              <>
                <FormSpacer>
                  <Field
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    secureTextEntry={true}
                    component={InputField}
                  />
                </FormSpacer>
              </>
            ) : phase === 3 ? (
              <>
                <FormSpacer>
                  <Field
                    name="uid"
                    placeholder={t("form.placeholder.uid")}
                    autoCapitalize="none"
                    helperText={t("form.helper.uid")}
                    maxLength={UidMax}
                    component={InputField}
                  />
                </FormSpacer>
                <FormSpacer>
                  <Field
                    name="username"
                    placeholder={t("form.placeholder.username")}
                    autoCapitalize="none"
                    maxLength={UsernameMax}
                    helperText={t("form.helper.username")}
                    component={InputField}
                  />
                </FormSpacer>
                <FormSpacer>
                  <Field
                    name="email"
                    placeholder={t("form.placeholder.email")}
                    editable={false}
                    helperText={t("form.helper.cannot_change")}
                    component={InputField}
                  />
                </FormSpacer>
                <FormSpacer>
                  <DatePickerField
                    label={t("user.birthday")}
                    name="birthdate"
                  />
                </FormSpacer>
                <FormSpacer>
                  <Field
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    secureTextEntry={true}
                    component={InputField}
                  />
                </FormSpacer>
              </>
            ) : null}
            <View style={styles.submitSection}>
              <MyButton
                color="primary"
                isLoading={isSubmitting}
                onPress={submitForm}
              >
                {phase >= 3 ? t("button.finish") : t("button.continue")}
              </MyButton>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  submitSection: {
    alignItems: "flex-start",
  },
});
