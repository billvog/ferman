import { Box, Text } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Heading,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useResetPasswordMutation } from "../../../generated/graphql";
import { InputField } from "../../../Components/InputField";
import { Layout } from "../../../Components/Layout";
import { withMyApollo } from "../../../Utils/withMyApollo";

const ResetPassword: NextPage = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();
  const [done, setDone] = useState(false);
  const [tokenError, setTokenError] = useState("");

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
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            // check if passwords match
            if (values.password !== values.confirmPassword) {
              return setErrors({
                confirmPassword: "Passwords do not match",
              });
            }

            const { data } = await resetPassword({
              variables: {
                password: values.password,
                token:
                  typeof router.query.token === "string"
                    ? router.query.token
                    : "",
              },
            });

            if (!data) {
              return toast({
                title: "Error",
                description: "Internal server error (500)",
                duration: 5000,
              });
            }

            if (data.resetPassword) {
              if (data.resetPassword.field === "token") {
                return setTokenError(data.resetPassword.message);
              }

              return setErrors({
                [data.resetPassword.field]: data.resetPassword.message,
              });
            }

            setDone(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {!!tokenError && (
                <Alert status="error" mb={3}>
                  <AlertIcon />
                  {tokenError}
                </Alert>
              )}
              <Heading
                mb={2}
                fontSize={30}
                color="mainDarkBlue"
                fontFamily="cursive"
              >
                Reset password
              </Heading>
              <InputField
                label="New Password"
                name="password"
                placeholder="Enter new password"
                type="password"
              />
              <Box mt={4}>
                <InputField
                  label="Confirm Password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  type="password"
                />
              </Box>
              <Flex justifyContent="space-between" align="center" mt={4}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Reset
                </Button>
                <Link color="grey">
                  <NextLink href="/account/login">or Sign in</NextLink>
                </Link>
              </Flex>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(ResetPassword);
