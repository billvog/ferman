import { Heading, Box, Flex, Button, Link } from "@chakra-ui/react";
import { LoginFormValues } from "@ferman/controller";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { LoginValidationSchema } from "@ferman/common";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<FormikErrors<LoginFormValues>>;
  done: boolean;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  done,
  isSubmitting,
}) => {
  const router = useRouter();

  if (done) {
    router.push("/");
  }

  return (
    <Layout size="sm" title="Sign in – Ferman" isNotAuth>
      <Form>
        <Heading mb={2} fontSize={30} color="mainDarkBlue" fontFamily="cursive">
          Sign in
        </Heading>
        <InputField
          label="Email"
          name="email"
          placeholder="Enter email"
          type="email"
        />
        <Box mt={4}>
          <InputField
            label="Password"
            name="password"
            placeholder="Enter password"
            type="password"
          />
        </Box>
        <Box mt={4}>
          <Flex justifyContent="space-between" align="center" mb={2}>
            <Button
              type="submit"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Sign in
            </Button>
            <Box>
              <NextLink href="/account/register">
                <Link color="grey">or Sign up</Link>
              </NextLink>
            </Box>
          </Flex>
          <Box>
            <Link color="grey" fontSize={14}>
              <NextLink href="/account/forgot-password">
                Forgot Password? Reset
              </NextLink>
            </Link>
          </Box>
        </Box>
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
