import { Box } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Heading,
  Link,
  toast,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { withMyApollo } from "../../utils/withMyApollo";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const toast = useToast();
  const [forgotPassword] = useForgotPasswordMutation();
  const [message, setMessage] = useState("");

  return (
    <Layout size="sm" title="Forgot Password – Ferman" isNotAuth>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await forgotPassword({
            variables: values,
          });

          if (!data) {
            return toast({
              title: "Error",
              description: "Internal server error",
              duration: 5000,
            });
          }

          if (data.forgotPassword) {
            return setErrors({
              [data.forgotPassword.field]: data.forgotPassword.message,
            });
          }

          return setMessage(
            "If a user exists with this email, an email has been sent with instructions."
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {!!message && (
              <Alert status="warning" mb={3}>
                <AlertIcon />
                {message}
              </Alert>
            )}
            <Heading
              mb={2}
              fontSize={30}
              color="mainDarkBlue"
              fontFamily="cursive"
            >
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
        )}
      </Formik>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(ForgotPassword);
