import FormStyles from "../../css/form.module.css";
import { ErrorMap, LoginFormValues } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import { LoginValidationSchema } from "@ferman-pkgs/common";
import { MyButton } from "../../components/MyButton";
import styled from "styled-components";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  isSubmitting,
}) => {
  return (
    <Layout size="sm" title="Sign in – Ferman" isNotAuth>
      <Form>
        <h1>Sign in</h1>
        <InputField
          label="Email"
          name="email"
          placeholder="Enter email"
          type="email"
        />
        <InputField
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
        />
        <div className={FormStyles.submitSection}>
          <MyButton type="submit" isLoading={isSubmitting}>
            Sign in
          </MyButton>
          <div>
            <NextLink href="/account/register">
              <span className="link">
                <OrSignUpLink>or Sign up</OrSignUpLink>
              </span>
            </NextLink>
          </div>
        </div>
        <div>
          <NextLink href="/account/forgot-password">
            <span className="link">
              <ForgotPwdLink>Forgot Password? Reset</ForgotPwdLink>
            </span>
          </NextLink>
        </div>
      </Form>
    </Layout>
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

// Styles
const OrSignUpLink = styled.div`
  color: grey;
  font-size: 15px;
`;

const ForgotPwdLink = styled.div`
  color: grey;
  font-size: 14px;
  margin-top: 8px;
`;
