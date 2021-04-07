import FormStyles from "../css/form.module.css";
import {
  ErrorMap,
  MyMessage,
  RegisterFormValues,
  RegisterPhase,
} from "@ferman-pkgs/controller";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {
  RegisterFourValidationSchema,
  RegisterOneValidationSchema,
  RegisterThreeValidationSchema,
  RegisterTwoValidationSchema,
  UidMax,
  UsernameMax,
} from "@ferman-pkgs/common";
import { InputField } from "../components/InputField";
import { MyAlert } from "../components/MyAlert";
import { MyButton } from "../components/MyButton";
import styled from "styled-components";

interface RegisterViewProps {
  storedInitialValues?: RegisterFormValues;
  submit: (values: RegisterFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
  phase: RegisterPhase;
  done: boolean;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  storedInitialValues,
  submit,
  message,
  phase,
  done,
}) => {
  // toggle show/hide password
  const [showPwd, setShowPwd] = useState(false);
  const handleTogglePwd = () => setShowPwd(!showPwd);

  return (
    <Layout size="md" title="Sign up – Ferman" isNotAuth>
      {done ? (
        <MyAlert type="success">
          <h2>Your account is finally ready!</h2>
          <p>
            We're happy to announce you that your account is ready! What are you
            waiting for? Start posting! <br />
            <NextLink href="/">
              <MyButton colorScheme="success" style={{ marginTop: 10 }}>
                Start
              </MyButton>
            </NextLink>
          </p>
        </MyAlert>
      ) : (
        <Formik
          validationSchema={() =>
            phase === 0
              ? RegisterOneValidationSchema
              : phase === 1
              ? RegisterTwoValidationSchema
              : phase === 2
              ? RegisterThreeValidationSchema
              : phase === 3
              ? RegisterFourValidationSchema
              : null
          }
          initialValues={{
            uid: storedInitialValues?.uid || "",
            username: storedInitialValues?.username || "",
            email: storedInitialValues?.email || "",
            birthdate: storedInitialValues?.birthdate || "",
            code: storedInitialValues?.code || "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const errors = await submit(values);
            if (errors) setErrors(errors);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {message && (
                <div style={{ marginBottom: 8 }}>
                  <MyAlert type={message.type}>{message.text}</MyAlert>
                </div>
              )}
              <h1>
                {phase === 0
                  ? "Sign up"
                  : phase === 1
                  ? "Verify your email"
                  : phase === 2
                  ? "Set your password"
                  : phase === 3
                  ? "Is everything okey?"
                  : null}
              </h1>
              {phase === 0 ? (
                <>
                  <InputField
                    label="User Id"
                    name="uid"
                    placeholder="Enter uid"
                    type="text"
                    maxLength={UidMax}
                    helperText="How others will search you. Choose it carefully, because you won't have the abillity to change it after is set."
                  />
                  <InputField
                    label="Username"
                    name="username"
                    placeholder="Enter username"
                    type="text"
                    maxLength={UsernameMax}
                    helperText="Your real name, will be displayed in your profile."
                  />
                  <InputField
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                  />
                  <InputField
                    label="Date of birth"
                    name="birthdate"
                    type="date"
                    helperText="This won't be visible to the public."
                  />
                  <div className={FormStyles.submitSection}>
                    <MyButton type="submit" isLoading={isSubmitting}>
                      Continue
                    </MyButton>
                    <div>
                      <NextLink href="/account/login">
                        <span className="link">
                          <OrSignInLink>or Sign in</OrSignInLink>
                        </span>
                      </NextLink>
                    </div>
                  </div>
                </>
              ) : phase === 1 ? (
                <>
                  <InputField
                    label="6-Digit Code"
                    name="code"
                    placeholder="Enter code"
                    type="text"
                    helperText="A 6-digit code has been sent to the email you have provided."
                  />
                  <MyButton type="submit" isLoading={isSubmitting}>
                    Continue
                  </MyButton>
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
                  <MyButton type="submit" isLoading={isSubmitting}>
                    Continue
                  </MyButton>
                </>
              ) : phase === 3 ? (
                <>
                  <InputField
                    label="User Id"
                    name="uid"
                    placeholder="Enter uid"
                    type="text"
                    maxLength={UidMax}
                    helperText="How others will search you. Choose it carefully, because you won't have the abillity to change it after is set."
                  />
                  <InputField
                    label="Username"
                    name="username"
                    placeholder="Enter username"
                    type="text"
                    maxLength={UsernameMax}
                    helperText="Your real name, will be displayed in your profile."
                  />
                  <InputField
                    label="Email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    disabled
                    helperText="This field cannot change now."
                  />
                  <InputField
                    label="Date of birth"
                    name="birthdate"
                    type="date"
                    helperText="This won't be visible to the public."
                  />
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
                  <MyButton type="submit" isLoading={isSubmitting}>
                    Finish
                  </MyButton>
                </>
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

// Styles
const OrSignInLink = styled.div`
  color: grey;
  font-size: 15px;
`;
