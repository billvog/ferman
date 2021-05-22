import {
  ErrorMap,
  MyMessage,
  RegisterFormValues,
  RegisterPhase,
} from "@ferman-pkgs/controller";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import NextLink from "next/link";
import {
  RegisterFourValidationSchema,
  RegisterOneValidationSchema,
  RegisterThreeValidationSchema,
  RegisterTwoValidationSchema,
  UidMax,
  UsernameMax,
} from "@ferman-pkgs/common";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const { t } = useTypeSafeTranslation();

  // toggle show/hide password
  const [showPwd, setShowPwd] = useState(false);
  const handleTogglePwd = () => setShowPwd(!showPwd);

  return (
    <div className="px-3">
      {done ? (
        <MyAlert color="success">
          <h2 className="text-lg">{t("register.success_alert.title")}</h2>
          <p>
            {t("register.success_alert.body")} <br />
            <NextLink href="/">
              <MyButton color="success" style={{ marginTop: 10 }}>
                {t("register.success_alert.start_posting")}
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
              {message && i18n.exists(message.text) && (
                <div className="mb-2">
                  <MyAlert color={message.type}>
                    {t(message.text as any)}
                  </MyAlert>
                </div>
              )}
              <h1 className="heading">
                {phase === 0
                  ? t("register.phase.sign_up")
                  : phase === 1
                  ? t("register.phase.verify")
                  : phase === 2
                  ? t("register.phase.set_password")
                  : phase === 3
                  ? t("register.phase.everything_alright")
                  : null}
              </h1>
              {phase === 0 ? (
                <>
                  <InputField
                    label={t("form.label.uid")}
                    name="uid"
                    placeholder={t("form.placeholder.uid")}
                    type="text"
                    maxLength={UidMax}
                    helperText={t("form.helper.uid")}
                  />
                  <InputField
                    label={t("form.label.username")}
                    name="username"
                    placeholder={t("form.placeholder.username")}
                    type="text"
                    maxLength={UsernameMax}
                    helperText={t("form.helper.username")}
                  />
                  <InputField
                    label={t("form.label.email")}
                    name="email"
                    placeholder={t("form.placeholder.email")}
                    type="email"
                  />
                  <InputField
                    label={t("my_account.date_of_birth")}
                    name="birthdate"
                    type="date"
                    helperText={t("form.helper.date_of_birth")}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <MyButton type="submit" isLoading={isSubmitting}>
                      {t("button.continue")}
                    </MyButton>
                    <div>
                      <NextLink href="/account/login">
                        <div className="text-primary-450 font-semibold text-sm cursor-pointer hover:underline">
                          {t("register.or_sign_in")}
                        </div>
                      </NextLink>
                    </div>
                  </div>
                </>
              ) : phase === 1 ? (
                <>
                  <InputField
                    label={t("form.label.six_digit")}
                    name="code"
                    placeholder={t("form.placeholder.six_digit")}
                    type="text"
                    helperText={t("form.helper.six_digit")}
                  />
                  <MyButton type="submit" isLoading={isSubmitting}>
                    {t("button.continue")}
                  </MyButton>
                </>
              ) : phase === 2 ? (
                <>
                  <InputField
                    label={t("form.label.password")}
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    type={showPwd ? "text" : "password"}
                    passwordOptions={{
                      handlePwdToggle: handleTogglePwd,
                      isPassword: true,
                      showPassword: showPwd,
                    }}
                  />
                  <MyButton type="submit" isLoading={isSubmitting}>
                    {t("button.continue")}
                  </MyButton>
                </>
              ) : phase === 3 ? (
                <>
                  <InputField
                    label={t("form.label.uid")}
                    name="uid"
                    placeholder={t("form.placeholder.uid")}
                    type="text"
                    maxLength={UidMax}
                    helperText={t("form.helper.uid")}
                  />
                  <InputField
                    label={t("form.label.username")}
                    name="username"
                    placeholder={t("form.placeholder.username")}
                    type="text"
                    maxLength={UsernameMax}
                    helperText={t("form.helper.username")}
                  />
                  <InputField
                    label={t("form.label.email")}
                    name="email"
                    placeholder={t("form.placeholder.email")}
                    type="email"
                    disabled
                    helperText={t("form.helper.cannot_change")}
                  />
                  <InputField
                    label={t("my_account.date_of_birth")}
                    name="birthdate"
                    type="date"
                    helperText={t("form.helper.date_of_birth")}
                  />
                  <InputField
                    label={t("form.label.password")}
                    name="password"
                    placeholder={t("form.placeholder.password")}
                    type={showPwd ? "text" : "password"}
                    passwordOptions={{
                      handlePwdToggle: handleTogglePwd,
                      isPassword: true,
                      showPassword: showPwd,
                    }}
                  />
                  <MyButton type="submit" isLoading={isSubmitting}>
                    {t("button.finish")}
                  </MyButton>
                </>
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
