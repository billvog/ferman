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
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import NextLink from "next/link";
import {
  MeDocument,
  MeQuery,
  useFinishRegisterMutation,
  useRegisterMutation,
  useValidateRegisterTokenMutation,
} from "../../generated/graphql";
import { withMyApollo } from "../../utils/withMyApollo";

const Register = ({}) => {
  const toast = useToast();

  const [register] = useRegisterMutation();
  const [validateToken] = useValidateRegisterTokenMutation();
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

  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [done, setDone] = useState(false);

  // toggle show/hide password
  const [showPwd, setShowPwd] = useState(false);
  const handleTogglePwd = () => setShowPwd(!showPwd);

  return (
    <Layout size="md" title="Sign up – Ferman" isNotAuth>
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
            waiting for? Start posting! <br />
            <NextLink href="/">
              <Button as={Link} colorScheme="green" mt={5}>
                Start
              </Button>
            </NextLink>
          </AlertDescription>
        </Alert>
      ) : (
        <Formik
          initialValues={{
            uid: "",
            username: "",
            email: "",
            birthdate: "",
            code: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            if (phase === 0) {
              const { data } = await register({
                variables: {
                  options: {
                    uid: values.uid,
                    username: values.username,
                    email: values.email,
                    birthdate: values.birthdate,
                  },
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

              if (data?.register) {
                return setErrors({
                  [data.register.field]: data.register.message,
                });
              }

              setPhase(1);
              return setMessage(
                "An email has been sent to the email address you've given. There, are instructions on how to continue setting up your account."
              );
            } else if (phase === 1) {
              const { data } = await validateToken({
                variables: {
                  token: values.code,
                },
              });

              if (!data?.validateRegisterToken) {
                return toast({
                  title: "Failed",
                  description: "Invalid token given",
                  status: "error",
                  duration: 5000,
                });
              }

              setMessage("");
              return setPhase(2);
            } else if (phase === 2) {
              const { data } = await finishRegister({
                variables: {
                  password: values.password,
                  token: values.code,
                  options: {
                    uid: values.uid,
                    username: values.username,
                    email: values.email,
                    birthdate: values.birthdate,
                  },
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
                return setErrors({
                  [data.finishRegister.error.field]:
                    data.finishRegister.error.message,
                });
              }

              setDone(true);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {!!message && (
                <Alert status="success" mb={3}>
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
                {phase === 0
                  ? "Sign up"
                  : phase === 1
                  ? "Fill in the code"
                  : phase === 2
                  ? "Set your password"
                  : null}
              </Heading>
              {phase === 0 ? (
                <>
                  <InputField
                    label="User Id"
                    name="uid"
                    placeholder="Enter uid"
                    type="text"
                    maxLength={20}
                    helperText="How others will search you. Choose it carefully, because you won't have the abillity to change it after is set."
                  />
                  <Box mt={4}>
                    <InputField
                      label="Username"
                      name="username"
                      placeholder="Enter username"
                      type="text"
                      maxLength={32}
                      helperText="Your real name, will be displayed in your profile."
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      label="Email"
                      name="email"
                      placeholder="Enter email"
                      type="email"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      label="Date of birth"
                      name="birthdate"
                      type="date"
                      helperText="This won't be visible to the public."
                    />
                  </Box>
                  <Flex mt={4} justifyContent="space-between" align="center">
                    <Button type="submit" isLoading={isSubmitting}>
                      Continue
                    </Button>
                    <Box>
                      <NextLink href="/account/login">
                        <Link color="grey">or Sign in</Link>
                      </NextLink>
                    </Box>
                  </Flex>
                </>
              ) : phase === 1 ? (
                <>
                  <InputField
                    label="Code"
                    name="code"
                    placeholder="Enter code"
                    type="text"
                    helperText="This code has been sent to the email you have provided."
                  />
                  <Button type="submit" isLoading={isSubmitting} mt={4}>
                    Continue
                  </Button>
                </>
              ) : phase === 2 ? (
                <>
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
                  <Button type="submit" isLoading={isSubmitting} mt={4}>
                    Finish
                  </Button>
                </>
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(Register);
