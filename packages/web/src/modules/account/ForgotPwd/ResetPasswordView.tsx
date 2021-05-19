import { ResetPasswordValidationSchema } from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  ResetPasswordFormValues,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React, { useState } from "react";
import { InputField } from "../../../components/InputField";
import NextLink from "next/link";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTranslation } from "react-i18next";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface ResetPasswordViewProps {
  submit: (values: ResetPasswordFormValues) => Promise<ErrorMap | null>;
  done: boolean;
  message: MyMessage | null;
}

const C: React.FC<
  ResetPasswordViewProps & FormikProps<ResetPasswordFormValues>
> = ({ done, message, isSubmitting }) => {
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();

  // toggle show/hide password
  const [showPwd, setShowPwd] = useState(false);
  const handleTogglePwd = () => setShowPwd(!showPwd);

  return (
    <>
      {done ? (
        <MyAlert color="success">
          <h2 className="text-lg">{t("reset_pwd.success_alert.title")}</h2>
          <p>
            {t("reset_pwd.success_alert.body")}
            <br />
            <NextLink href="/account/login">
              <MyButton color="success" style={{ marginTop: 10 }}>
                {t("reset_pwd.success_alert.sign_in")}
              </MyButton>
            </NextLink>
          </p>
        </MyAlert>
      ) : (
        <Form>
          {message && i18n.exists(message.text) && (
            <div className="mb-2">
              <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
            </div>
          )}
          <InputField
            label={t("form.label.new_password")}
            name="password"
            placeholder={t("form.placeholder.new_password")}
            type={showPwd ? "text" : "password"}
            passwordOptions={{
              handlePwdToggle: handleTogglePwd,
              isPassword: true,
              showPassword: showPwd,
            }}
          />
          <div className="flex justify-between items-center mt-4">
            <MyButton type="submit" isLoading={isSubmitting}>
              {t("button.reset")}
            </MyButton>
          </div>
        </Form>
      )}
    </>
  );
};

export const ResetPasswordView = withFormik<
  ResetPasswordViewProps,
  ResetPasswordFormValues
>({
  validationSchema: ResetPasswordValidationSchema,
  mapPropsToValues: () => ({
    password: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
