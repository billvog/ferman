import FormStyles from "../css/form.module.css";
import { ResetPasswordValidationSchema } from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  ResetPasswordFormValues,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { MyAlert } from "../components/MyAlert";
import { MyButton } from "../components/MyButton";

interface ResetPasswordViewProps {
  submit: (values: ResetPasswordFormValues) => Promise<ErrorMap | null>;
  done: boolean;
  message: MyMessage | null;
}

const C: React.FC<
  ResetPasswordViewProps & FormikProps<ResetPasswordFormValues>
> = ({ done, message, isSubmitting }) => {
  // toggle show/hide password
  const [showPwd, setShowPwd] = useState(false);
  const handleTogglePwd = () => setShowPwd(!showPwd);

  return (
    <Layout size="sm" title="Reset Password – Ferman" isNotAuth>
      {done ? (
        <MyAlert type="success">
          <h2>Your password has been reset!</h2>
          <p>
            We're happy to announce you that your password has been reset!{" "}
            <br />
            <NextLink href="/account/login">
              <MyButton colorScheme="success" style={{ marginTop: 10 }}>
                Sign in
              </MyButton>
            </NextLink>
          </p>
        </MyAlert>
      ) : (
        <Form>
          {message && (
            <div style={{ marginBottom: 8 }}>
              <MyAlert type={message.type}>{message.text}</MyAlert>
            </div>
          )}
          <h1>Reset password</h1>
          <InputField
            label="Password"
            name="password"
            placeholder="Enter password"
            type={showPwd ? "text" : "password"}
            passwordOptions={{
              handlePwdToggle: handleTogglePwd,
              isPassword: true,
              showPassword: showPwd,
            }}
          />
          <div className={FormStyles.submitSection}>
            <MyButton type="submit" isLoading={isSubmitting}>
              Reset
            </MyButton>
          </div>
        </Form>
      )}
    </Layout>
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
