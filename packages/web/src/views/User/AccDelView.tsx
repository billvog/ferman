import FormStyles from "../../css/form.module.css";
import {
  DeleteUserFormValues,
  DeleteUserPhase,
  ErrorMap,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { MyAlert } from "../../components/MyAlert";
import { MyButton } from "../../components/MyButton";
import styled from "styled-components";
import Modal from "react-modal";
import { CenteredModalOptions, ModalStyles } from "../../utils/modalOptions";
import {
  AccountDeletionOne,
  AccountDeletionTwo,
  EmptySchema,
} from "@ferman-pkgs/common";

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
  const [isModalOpen, setModalOpen] = useState(false);

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
                    <div className="text-sm text-gray-400 font-semibold mb-2 leading-snug">
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
                    />
                    <div className="flex justify-between items-center mt-4">
                      <MyButton
                        onClick={() => setModalOpen(true)}
                        type="button"
                        isLoading={isSubmitting}
                      >
                        Finish
                      </MyButton>
                    </div>
                    {/* Confirm modal */}
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={() => setModalOpen(false)}
                      style={CenteredModalOptions}
                      contentLabel="Confirm"
                    >
                      <ModalStyles.Title>
                        After this, there's no comeback.
                      </ModalStyles.Title>
                      <ModalStyles.Message>
                        By deleting your account, all your posts, comments,
                        follows, likes will be deleted. Any action cannot be
                        undone and will be permanent.
                      </ModalStyles.Message>
                      <ModalStyles.ButtonContainer>
                        <MyButton
                          onClick={() => {
                            setModalOpen(false);
                            submitForm();
                          }}
                        >
                          Delete My Account
                        </MyButton>
                        <ModalStyles.SecondaryButton
                          onClick={() => setModalOpen(false)}
                        >
                          No, I changed my mind
                        </ModalStyles.SecondaryButton>
                      </ModalStyles.ButtonContainer>
                    </Modal>
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
