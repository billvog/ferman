import { LoginValidationSchema } from "@ferman-pkgs/common";
import { ErrorMap, LoginFormValues, MyMessage } from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { Field, FormikProps, withFormik } from "formik";
import i18n from "i18next";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FormContainer } from "../../../components/FormContainer";
import { FormSpacer } from "../../../components/FormSpacer";
import { InputField } from "../../../form-fields/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { AuthNavProps } from "../../../navigation/AuthStack/ParamList";
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
  const navigation = useNavigation<AuthNavProps<"Login">["navigation"]>();

  return (
    <FormContainer>
      {!!message && i18n.exists(message.text) && (
        <View
          style={{
            marginBottom: 14,
          }}
        >
          <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
        </View>
      )}
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
        <Field
          name="password"
          placeholder={t("form.placeholder.password")}
          secureTextEntry={true}
          component={InputField}
        />
      </FormSpacer>
      <View>
        <MyButton
          color="secondary"
          isLoading={isSubmitting}
          onPress={submitForm}
        >
          {t("login.sign_in")}
        </MyButton>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{
          marginTop: 12,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: fontSize.h6,
            fontFamily: fontFamily.inter.bold,
            color: colors.primary500,
            textAlign: "center",
          }}
        >
          {t("login.or_sign_up")}
        </Text>
      </TouchableOpacity>
    </FormContainer>
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
