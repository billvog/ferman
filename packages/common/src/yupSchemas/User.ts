import * as yup from "yup";
import { BIRTHDATE_SHAPE } from "./Profile";

const UidLengthMessage = "Length must be between 2 and 20";
const UidRegexMessage =
  "Allowed characters: latin letters, numbers, dashes. The first and last character cannot be a dash.";
const UsernameLengthMessage = "Length must be between 6 and 32";
const EmailInvalidMessage = "Please enter a valid email";
const PasswordLengthMessage = "Length must be at least 6";

export const UID_SHAPE = yup
  .string()
  .min(2, UidLengthMessage)
  .max(20, UidLengthMessage)
  .required()
  .trim()
  .matches(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/, UidRegexMessage);
export const USERNAME_SHAPE = yup
  .string()
  .min(6, UsernameLengthMessage)
  .max(32, UsernameLengthMessage)
  .required()
  .trim();
export const EMAIL_SHAPE = yup
  .string()
  .max(255)
  .required()
  .trim()
  .lowercase()
  .email(EmailInvalidMessage);
export const PASSWORD_SHAPE = yup
  .string()
  .min(6, PasswordLengthMessage)
  .max(255)
  .required();

export const LoginValidationSchema = yup.object().shape({
  email: EMAIL_SHAPE,
  password: PASSWORD_SHAPE,
});

export const RegisterValidationSchema = yup.object().shape({
  uid: UID_SHAPE,
  username: USERNAME_SHAPE,
  email: EMAIL_SHAPE,
  birthdate: BIRTHDATE_SHAPE,
});

export const ForgotPasswordValidationSchema = yup.object().shape({
  email: EMAIL_SHAPE,
});
export const ResetPasswordValidationSchema = yup.object().shape({
  password: PASSWORD_SHAPE,
});
