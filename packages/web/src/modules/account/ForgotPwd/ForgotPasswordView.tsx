import {
  ErrorMap,
  ForgotPasswordFormValues,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../../components/InputField";
import NextLink from "next/link";
import { ForgotPasswordValidationSchema } from "@ferman-pkgs/common";
import { MyButton } from "../../../components/MyButton";
import { MyAlert } from "../../../components/MyAlert";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { useTranslation } from "react-i18next";

interface ForgotPasswordViewProps {
  submit: (values: ForgotPasswordFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<
  ForgotPasswordViewProps & FormikProps<ForgotPasswordFormValues>
> = ({ isSubmitting, message }) => {
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();

  return (
    <Form>
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
      <div className="flex justify-between items-center mt-4">
        <MyButton type="submit" isLoading={isSubmitting}>
          {t("button.send")}
        </MyButton>
        <NextLink href="/account/login">
          <span className="text-primary-450 font-semibold text-sm cursor-pointer hover:underline">
            {t("forgot_pwd.or_sign_in")}
          </span>
        </NextLink>
      </div>
    </Form>
  );
};

export const ForgotPasswordView = withFormik<
  ForgotPasswordViewProps,
  ForgotPasswordFormValues
>({
  validationSchema: ForgotPasswordValidationSchema,
  mapPropsToValues: () => ({
    email: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
