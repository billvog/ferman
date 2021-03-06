import { ErrorMap, LoginFormValues, MyMessage } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../../components/InputField";
import NextLink from "next/link";
import { LoginValidationSchema } from "@ferman-pkgs/common";
import { MyButton } from "../../../components/MyButton";
import { MyAlert } from "../../../components/MyAlert";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { useTranslation } from "react-i18next";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  message,
  isSubmitting,
}) => {
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();

  return (
    <Form className="px-4 py-2">
      {message && i18n.exists(message.text) && (
        <div className="mb-2">
          <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
        </div>
      )}
      <InputField
        label={t("form.label.email")}
        name="email"
        placeholder={t("form.placeholder.email")}
        type="email"
      />
      <InputField
        label={t("form.label.password")}
        name="password"
        placeholder={t("form.placeholder.password")}
        type="password"
      />
      <div className="flex justify-between items-center mt-4">
        <MyButton type="submit" isLoading={isSubmitting}>
          {t("login.sign_in")}
        </MyButton>
        <div>
          <NextLink href="/account/register">
            <div className="text-primary-450 font-semibold text-sm cursor-pointer hover:underline">
              {t("login.or_sign_up")}
            </div>
          </NextLink>
        </div>
      </div>
      <div>
        <NextLink href="/account/forgot-password">
          <div className="mt-2 text-primary-450 font-semibold text-sm cursor-pointer hover:underline">
            {t("login.forgot_pwd")}
          </div>
        </NextLink>
      </div>
    </Form>
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
