import { Box, Button, Flex, Heading, Link, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../Components/InputField";
import { Layout } from "../../Components/Layout";
import NextLink from "next/link";
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withMyApollo } from "../../Utils/withMyApollo";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const [login] = useLoginMutation({
    update: async (store, { data }) => {
      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data?.login.user,
        },
      });
    },
  });

  return (
    <Layout size="sm" title="Sign in – Ferman" isNotAuth>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await login({
            variables: {
              options: values,
            },
          });

          if (!data) {
            return toast({
              title: "Error",
              description: "Internal server error (500)",
              status: "error",
              duration: 5000,
            });
          }

          if (data?.login.error) {
            return setErrors({
              [data.login.error.field]: data.login.error.message,
            });
          }

          // redirect
          router.push("/");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Heading
              mb={2}
              fontSize={30}
              color="mainDarkBlue"
              fontFamily="cursive"
            >
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
        )}
      </Formik>
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(Login);
