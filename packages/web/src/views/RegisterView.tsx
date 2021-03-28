import { Box } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Heading,
  Link,
} from "@chakra-ui/react";
import { RegisterFormValues, RegisterPhase } from "@ferman/controller";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { RegisterValidationSchema } from "@ferman/common";
import { InputField } from "../components/InputField";

interface RegisterViewProps {
  submit: (
    values: RegisterFormValues
  ) => Promise<FormikErrors<RegisterFormValues> | null>;
  message: string;
  error: boolean;
  phase: RegisterPhase;
  done: boolean;
}

const C: React.FC<RegisterViewProps & FormikProps<RegisterFormValues>> = ({
  message,
  error,
  phase,
  done,
  isSubmitting,
}) => {
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
        <Form>
          {!!message && (
            <Alert status={error ? "error" : "success"} mb={3}>
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
    </Layout>
  );
};

export const RegisterView = withFormik<RegisterViewProps, RegisterFormValues>({
  validationSchema: RegisterValidationSchema,
  mapPropsToValues: () => ({
    uid: "",
    username: "",
    email: "",
    birthdate: "",
    code: "",
    password: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
