import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { LoginFormValues, ErrorMap, MyMessage } from "@ferman-pkgs/controller";
import { FormikProps, withFormik, Field } from "formik";
import { LoginValidationSchema } from "@ferman-pkgs/common";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { useTranslation } from "react-i18next";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  message,
  isSubmitting,
  submitForm,
}) => {
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();

  return (
    <SafeAreaView
      style={{
        marginHorizontal: 10,
        marginVertical: 12,
      }}
    >
      {!!message && i18n.exists(message.text) && (
        <View
          style={{
            marginBottom: 12,
          }}
        >
          <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
        </View>
      )}
      <View
        style={{
          marginBottom: 12,
        }}
      >
        <Field
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          component={InputField}
        />
      </View>
      <View
        style={{
          marginBottom: 12,
        }}
      >
        <Field
          name="password"
          secureTextEntry={true}
          placeholder="Password"
          component={InputField}
        />
      </View>
      <View>
        <MyButton
          title={t("login.sign_in")}
          style="secondary"
          isLoading={isSubmitting}
          onPress={submitForm}
        />
      </View>
    </SafeAreaView>
  );
};

export const LoginView = withFormik<LoginViewProps, LoginFormValues>({
  validationSchema: LoginValidationSchema,
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
