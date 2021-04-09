import FormStyles from "../../css/form.module.css";
import {
  DeleteUserFormValues,
  DeleteUserPhase,
  ErrorMap,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { MyAlert } from "../../components/MyAlert";
import { MyButton } from "../../components/MyButton";
import styled from "styled-components";

interface AccDelViewProps {
  submit: (values: DeleteUserFormValues) => Promise<ErrorMap | null>;
  phase: DeleteUserPhase;
  message: MyMessage | null;
  done: boolean;
}

export const AccDelView: React.FC<AccDelViewProps> = ({
  submit,
  phase,
  message,
  done,
}) => {
  return (
    <>
      <Layout size="md" title="Delete Account – Ferman" isAuth>
        {done ? (
          <MyAlert type="success">
            <h2>Your account is deleted!</h2>
            <p>Your account is finaly deleted. Hope we see you again!</p>
          </MyAlert>
        ) : (
          <Formik
            initialValues={{ code: "", password: "" }}
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
                    ? "Delete Your Account"
                    : phase === 1
                    ? "Verify your email"
                    : phase === 2
                    ? "Verify your identity"
                    : null}
                </h1>
                {phase === 0 ? (
                  <>
                    <MakeSubmitGuideText>
                      Deleting your account, requires you to pass a two-factor
                      authentication process to proove you are the owner of this
                      account.
                    </MakeSubmitGuideText>
                    <MyButton type="submit" isLoading={isSubmitting}>
                      Submit Request
                    </MyButton>
                  </>
                ) : phase === 1 ? (
                  <>
                    <InputField
                      label="Code"
                      name="code"
                      placeholder="Enter 6-digit code"
                      helperText="Enter the 6-digit code sent to your email."
                    />
                    <div className={FormStyles.submitSection}>
                      <MyButton type="submit" isLoading={isSubmitting}>
                        Continue
                      </MyButton>
                    </div>
                  </>
                ) : phase === 2 ? (
                  <>
                    <InputField
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      helperText="Enter your password to prove your identity."
                    />
                    <div className={FormStyles.submitSection}>
                      <MyButton type="submit" isLoading={isSubmitting}>
                        Finish
                      </MyButton>
                    </div>
                  </>
                ) : null}
              </Form>
            )}
          </Formik>
        )}
      </Layout>
    </>
  );
};

// Styles
const MakeSubmitGuideText = styled.div`
  font-size: 10.5pt;
  color: grey;
  margin: 10px 0;
  line-height: 1.45;
`;
