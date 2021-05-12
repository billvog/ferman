import {
  DeleteUserFormValues,
  DeleteUserPhase,
  ErrorMap,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import {
  AccountDeletionOne,
  AccountDeletionTwo,
  EmptySchema,
} from "@ferman-pkgs/common";
import { Dialog, Transition } from "@headlessui/react";
import { MyDialog } from "../../../components/MyDialog";

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
  // confirm modal
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  return (
    <>
      <Layout size="md" title="Delete Account – Ferman" isAuth>
        {done ? (
          <MyAlert color="success">
            <h2 className="text-lg">Your account is deleted!</h2>
            <p>Your account is finaly deleted. Hope we see you again!</p>
          </MyAlert>
        ) : (
          <Formik
            validateOnChange={false}
            validationSchema={() =>
              phase === 1
                ? AccountDeletionOne
                : phase === 2
                ? AccountDeletionTwo
                : EmptySchema
            }
            initialValues={{ code: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const errors = await submit(values);
              if (errors) setErrors(errors);
            }}
          >
            {({ isSubmitting, submitForm }) => (
              <Form>
                {message && (
                  <div className="mb-2">
                    <MyAlert color={message.type}>{message.text}</MyAlert>
                  </div>
                )}
                <h1 className="heading">
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
                    <div className="text-sm text-secondary-400 font-semibold mb-2 leading-snug">
                      Deleting your account, requires you to pass a two-factor
                      authentication process to proove you are the owner of this
                      account.
                    </div>
                    <MyButton type="submit" isLoading={isSubmitting}>
                      Submit Request
                    </MyButton>
                  </>
                ) : phase === 1 ? (
                  <>
                    <InputField
                      label="Code"
                      name="code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      helperText="Enter the 6-digit code sent to your email."
                    />
                    <div className="flex justify-between items-center mt-4">
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
                      onKeyPress={(e) => {
                        if (e.which === 13) {
                          e.preventDefault();
                          setConfirmModalOpen(true);
                        }
                      }}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <MyButton
                        onClick={() => setConfirmModalOpen(true)}
                        type="button"
                        isLoading={isSubmitting}
                      >
                        Finish
                      </MyButton>
                    </div>
                    {/* Confirm modal */}
                    <MyDialog
                      title="After this, there's no comeback."
                      body="By deleting your account, all your posts, comments, follows, likes will be deleted. Any action cannot be undone and will be permanent."
                      buttons={
                        <>
                          <MyButton
                            color="danger"
                            type="button"
                            onClick={() => {
                              setConfirmModalOpen(false);
                              submitForm();
                            }}
                          >
                            I'm sure
                          </MyButton>
                          <MyButton
                            color="secondary"
                            type="button"
                            onClick={() => setConfirmModalOpen(false)}
                          >
                            I changed my mind
                          </MyButton>
                        </>
                      }
                      isOpen={isConfirmModalOpen}
                      onClose={() => setConfirmModalOpen(false)}
                    />
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
