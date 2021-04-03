import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import { useDeleteAccountMutation } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../utils/withMyApollo";
import { useApolloClient } from "@apollo/client";

const DeleteAcount = ({}) => {
  const toast = useToast();
  const apolloClient = useApolloClient();
  const [done, setDone] = useState(false);
  const [deleteAccount] = useDeleteAccountMutation();

  return (
    <Layout size="sm" title="Delete Account – Ferman" isAuth>
      {done ? (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Your account is deleted!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            It's ok. Don't feel bad. Goodbye, you beautiful entity!
          </AlertDescription>
        </Alert>
      ) : (
        <Formik
          initialValues={{ password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await deleteAccount({
              variables: values,
            });

            if (!data) {
              return toast({
                title: "Error",
                description: "Internal server error (500)",
                status: "error",
                duration: 5000,
              });
            }

            if (data?.deleteAccount) {
              return setErrors({
                [data.deleteAccount.field]: data.deleteAccount.message,
              });
            }

            await apolloClient.resetStore();
            return setDone(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Heading mb={2} fontSize={30} color="mainDarkBlue">
                Delete Your Account
              </Heading>
              <InputField
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                helperText="Enter your password to prove your identity."
              />
              <Box mt={4}>
                <Flex justifyContent="space-between" align="center" mb={2}>
                  <Button
                    colorScheme="red"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Delete
                  </Button>
                  <Box>
                    <NextLink href="/account">
                      <Link color="grey" fontSize={14}>
                        I changed my mind
                      </Link>
                    </NextLink>
                  </Box>
                </Flex>
                <Text mb={4} color="grey" fontSize={12}>
                  Clicking "Delete" will delete your account and anything that's
                  associated with it.
                </Text>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(DeleteAcount);
