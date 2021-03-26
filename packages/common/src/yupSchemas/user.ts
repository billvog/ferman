import * as yup from "yup";

const USER_UID_SHAPE = yup
  .string()
  .min(2)
  .max(20)
  .required()
  .trim()
  .matches(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/);
const USER_USERNAME_SHAPE = yup.string().min(6).max(32).required().trim();
const USER_EMAIL_SHAPE = yup
  .string()
  .max(255)
  .required()
  .trim()
  .lowercase()
  .email();
const USER_BIRTHDATE_SHAPE = yup.date();
const USER_PASSWORD_SHAPE = yup.string().min(6).max(255).required();

export const LoginValidationSchema = yup.object().shape({
  email: USER_EMAIL_SHAPE,
  password: USER_PASSWORD_SHAPE,
});

export const RegisterValidationSchema = yup.object().shape({
  uid: USER_UID_SHAPE,
  username: USER_USERNAME_SHAPE,
  email: USER_EMAIL_SHAPE,
  birthdate: USER_BIRTHDATE_SHAPE,
});

export const ForgotPasswordValidationSchema = yup.object().shape({
  email: USER_EMAIL_SHAPE,
});
export const ResetPasswordValidationSchema = yup.object().shape({
  password: USER_PASSWORD_SHAPE,
});
