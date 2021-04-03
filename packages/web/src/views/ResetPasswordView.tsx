import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Link,
  Heading,
  Box,
} from "@chakra-ui/react";
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
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="250px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Your password has been reset!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We're happy to announce you that your password has been reset!{" "}
            <br />
            <NextLink href="/account/login">
              <Button as={Link} colorScheme="green" mt={5}>
                Sign in
              </Button>
            </NextLink>
          </AlertDescription>
        </Alert>
      ) : (
        <Form>
          {message && (
            <Alert status={message.type} mb={3}>
              <AlertIcon />
              {message.text}
            </Alert>
          )}
          <Heading mb={2} fontSize={30} color="mainDarkBlue">
            Reset password
          </Heading>
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
          <Box mt={4}>
            <Button type="submit" isLoading={isSubmitting}>
              Reset
            </Button>
          </Box>
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
