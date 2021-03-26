import { Box, Heading, Link, Text } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ErrorText } from "../../../components/ErrorText";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  MeDocument,
  MeQuery,
  useFinishRegisterMutation,
  useGetRedisStoredUserQuery,
} from "../../../generated/graphql";
import { withMyApollo } from "../../../utils/withMyApollo";
import NextLink from "next/link";

const FinishRegister = ({}) => {
  const router = useRouter();
  const toast = useToast();

  const {
    data: storedUserData,
    loading: storedUserLoading,
  } = useGetRedisStoredUserQuery({
    skip: typeof router.query.token !== "string",
    variables: {
      token: router.query.token as string,
    },
  });

  const [finishRegister] = useFinishRegisterMutation({
    update: async (store, { data }) => {
      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data?.finishRegister.user,
        },
      });
    },
  });

  const [done, setDone] = useState(false);
  const [tokenError, setTokenError] = useState("");

  // toggle show/hide password
  const [showPwd, setShowPwd] = useState(false);
  const handleTogglePwd = () => setShowPwd(!showPwd);

  return (
    <Layout size="md" title="Finish Setup – Ferman" isNotAuth>
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
            Your account is finally ready!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We're happy to announce you that your account is ready! What are you
            waiting? Start posting! <br />
            <NextLink href="/account/">
              <Button as={Link} colorScheme="green" mt={5}>
                My Account
              </Button>
            </NextLink>
          </AlertDescription>
        </Alert>
      ) : storedUserLoading ? (
        <Spinner />
      ) : !storedUserData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : !!tokenError ? (
        <Alert status="error" mb={3}>
          <AlertIcon />
          {tokenError}
        </Alert>
      ) : storedUserData.getRedisStoredUser?.error?.field === "token" ? (
        <Alert status="error" mb={3}>
          <AlertIcon />
          {storedUserData.getRedisStoredUser?.error.message}
        </Alert>
      ) : (
        <Formik
          initialValues={{
            uid: storedUserData.getRedisStoredUser?.storedUser?.uid || "",
            username:
              storedUserData.getRedisStoredUser?.storedUser?.username || "",
            birthdate:
              storedUserData.getRedisStoredUser?.storedUser?.birthdate || "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await finishRegister({
              variables: {
                token: (router.query.token as string) || "",
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

            if (data?.finishRegister.error) {
              if (data.finishRegister.error.field === "token") {
                return setTokenError(data.finishRegister.error.message);
              }

              return setErrors({
                [data.finishRegister.error.field]:
                  data.finishRegister.error.message,
              });
            }

            setDone(true);
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
                Finish Sign up
              </Heading>
              <InputField
                label="User Id"
                name="uid"
                placeholder="Enter uid"
                type="text"
                maxLength={20}
              />
              <Box mt={4}>
                <InputField
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                  type="text"
                  maxLength={32}
                />
              </Box>
              <Box mt={4}>
                <InputField
                  label="Email"
                  name="email"
                  disabled={true}
                  value={storedUserData.getRedisStoredUser?.storedUser?.email}
                />
              </Box>
              <Box mt={4}>
                <InputField
                  label="Date of birth"
                  name="birthdate"
                  type="date"
                />
              </Box>
              <Box mt={4}>
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
              </Box>
              <Button mt={4} type="submit" isLoading={isSubmitting}>
                Finish
              </Button>
              <Text color="grey" fontSize={12} mt={1}>
                Clicking "Finish" you're obliged to agree to our{" "}
                <Link color="cornflowerblue">
                  <NextLink href="/service/tos">terms of services</NextLink>
                </Link>
                .
              </Text>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(FinishRegister);
