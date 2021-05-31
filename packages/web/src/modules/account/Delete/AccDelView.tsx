import {
  DeleteUserFormValues,
  DeleteUserPhase,
  ErrorMap,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import {
  AccountDeletionOneValidationSchema,
  AccountDeletionTwoValidationSchema,
  EmptySchema,
} from "@ferman-pkgs/common";
import { MyDialog } from "../../../components/MyDialog";
import { useTranslation } from "react-i18next";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { useRouter } from "next/router";

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
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  return (
    <div className="px-4 py-2">
      {done ? (
        <MyAlert color="success">
          <h2 className="text-lg">{t("delete_account.success_alert.title")}</h2>
          <p>{t("delete_account.success_alert.body")}</p>
        </MyAlert>
      ) : (
        <Formik
          validateOnChange={false}
          validationSchema={() =>
            phase === 1
              ? AccountDeletionOneValidationSchema
              : phase === 2
              ? AccountDeletionTwoValidationSchema
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
              {message && i18n.exists(message.text) && (
                <div className="mb-2">
                  <MyAlert color={message.type}>
                    {t(message.text as any)}
                  </MyAlert>
                </div>
              )}
              <h1 className="heading">
                {phase === 0
                  ? t("delete_account.phase.delete_account")
                  : phase === 1
                  ? t("delete_account.phase.verify_email")
                  : phase === 2
                  ? t("delete_account.phase.verify_identity")
                  : null}
              </h1>
              {phase === 0 ? (
                <>
                  <div className="text-sm text-primary-400 font-semibold mb-2 leading-snug">
                    {t("delete_account.subtext")}
                  </div>
                  <MyButton type="submit" isLoading={isSubmitting}>
                    {t("delete_account.send_request")}
                  </MyButton>
                </>
              ) : phase === 1 ? (
                <>
                  <InputField
                    label={t("form.label.six_digit")}
                    name="code"
                    type="text"
                    placeholder={t("form.placeholder.six_digit")}
                    helperText={t("form.helper.six_digit")}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <MyButton type="submit" isLoading={isSubmitting}>
                      {t("button.continue")}
                    </MyButton>
                  </div>
                </>
              ) : phase === 2 ? (
                <>
                  <InputField
                    label={t("form.label.password")}
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    type="password"
                    helperText={t("delete_account.password_helper")}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <MyButton type="submit" isLoading={isSubmitting}>
                      {t("button.finish")}
                    </MyButton>
                  </div>
                </>
              ) : phase === 3 ? (
                <MyDialog
                  title={t("delete_account.confirm_modal.title")}
                  body={t("delete_account.confirm_modal.body")}
                  buttons={
                    <>
                      <MyButton
                        color="danger"
                        type="button"
                        onClick={() => {
                          submitForm();
                        }}
                      >
                        {t("button.sure")}
                      </MyButton>
                      <MyButton
                        color="primary"
                        type="button"
                        onClick={() => router.replace("/account")}
                      >
                        {t("delete_account.confirm_modal.changed_mind")}
                      </MyButton>
                    </>
                  }
                  isOpen={true}
                  onClose={() => {}}
                />
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
