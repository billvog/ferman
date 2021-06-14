import { LoginValidationSchema } from "@ferman-pkgs/common";
import { ErrorMap, LoginFormValues, MyMessage } from "@ferman-pkgs/controller";
import { Field, FormikProps, withFormik } from "formik";
import i18n from "i18next";
import React from "react";
import { View } from "react-native";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  message,
  isSubmitting,
  submitForm,
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <View
      style={{
        marginHorizontal: 12,
        marginVertical: 14,
      }}
    >
      {!!message && i18n.exists(message.text) && (
        <View
          style={{
            marginBottom: 14,
          }}
        >
          <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
        </View>
      )}
      <View
        style={{
          marginBottom: 14,
        }}
      >
        <Field
          name="email"
          placeholder={t("form.placeholder.email")}
          autoCapitalize="none"
          autoCompleteType="email"
          keyboardType="email-address"
          component={InputField}
        />
      </View>
      <View
        style={{
          marginBottom: 14,
        }}
      >
        <Field
          name="password"
          placeholder={t("form.placeholder.password")}
          secureTextEntry={true}
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
    </View>
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
