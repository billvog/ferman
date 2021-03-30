import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import {
  ErrorMap,
  ForgotPasswordFormValues,
  MyMessage,
} from "@ferman/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { ForgotPasswordValidationSchema } from "@ferman/common";

interface ForgotPasswordViewProps {
  submit: (values: ForgotPasswordFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<
  ForgotPasswordViewProps & FormikProps<ForgotPasswordFormValues>
> = ({ isSubmitting, message }) => {
  return (
    <Layout title="Forgot Password – Ferman" isNotAuth>
      <Form>
        {message && (
          <Alert status={message.type} mb={3}>
            <AlertIcon />
            {message.text}
          </Alert>
        )}
        <Heading mb={2} fontSize={30} color="mainDarkBlue">
          Forgot password
        </Heading>
        <InputField
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <Flex justifyContent="space-between" align="center" mt={4}>
          <Button
            type="submit"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            Send
          </Button>
          <Link color="grey">
            <NextLink href="/account/login">or Sign in</NextLink>
          </Link>
        </Flex>
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
