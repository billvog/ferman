import { ErrorMap, LoginFormValues, MyMessage } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import NextLink from "next/link";
import { LoginValidationSchema } from "@ferman-pkgs/common";
import { MyButton } from "../../../components/MyButton";
import { MyAlert } from "../../../components/MyAlert";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  message,
  isSubmitting,
}) => {
  return (
    <Layout title="Sign in – Ferman" pageTitle="Sign in" isNotAuth>
      <Form>
        {message && (
          <div className="mb-2">
            <MyAlert color={message.type}>{message.text}</MyAlert>
          </div>
        )}
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
        <div className="flex justify-between items-center mt-4">
          <MyButton type="submit" isLoading={isSubmitting}>
            Sign in
          </MyButton>
          <div>
            <NextLink href="/account/register">
              <div className="text-primary-450 font-semibold text-sm cursor-pointer hover:underline">
                or Sign up
              </div>
            </NextLink>
          </div>
        </div>
        <div>
          <NextLink href="/account/forgot-password">
            <div className="mt-2 text-primary-450 font-semibold text-sm cursor-pointer hover:underline">
              Forgot Password? Reset
            </div>
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
