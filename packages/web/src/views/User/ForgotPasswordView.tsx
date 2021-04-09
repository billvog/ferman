import FormStyles from "../../css/form.module.css";
import {
  ErrorMap,
  ForgotPasswordFormValues,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import NextLink from "next/link";
import { Layout } from "../../components/Layout";
import { ForgotPasswordValidationSchema } from "@ferman-pkgs/common";
import { MyButton } from "../../components/MyButton";
import { MyAlert } from "../../components/MyAlert";

interface ForgotPasswordViewProps {
  submit: (values: ForgotPasswordFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<
  ForgotPasswordViewProps & FormikProps<ForgotPasswordFormValues>
> = ({ isSubmitting, message }) => {
  return (
    <Layout title="Forgot Password – Ferman" isNotAuth size="sm">
      <Form>
        {message && (
          <div style={{ marginBottom: 8 }}>
            <MyAlert type={message.type}>{message.text}</MyAlert>
          </div>
        )}
        <h1>Forgot password</h1>
        <InputField
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <div className={FormStyles.submitSection}>
          <MyButton type="submit" isLoading={isSubmitting}>
            Send
          </MyButton>
          <NextLink href="/account/login">
            <span className="link" style={{ color: "grey" }}>
              or Sign in
            </span>
          </NextLink>
        </div>
      </Form>
    </Layout>
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
