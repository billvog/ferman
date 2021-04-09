import * as yup from "yup";
import { BIRTHDATE_SHAPE } from "./Profile";

const UidLengthMessage = "Length must be between 2 and 20";
const UidRegexMessage =
  "Allowed characters: latin letters, numbers, dashes. The first and last character cannot be a dash.";
const UsernameLengthMessage = "Length must be between 6 and 32";
const EmailInvalidMessage = "Please enter a valid email";
const PasswordLengthMessage = "Length must be at least 6";

export const UidMin = 2;
export const UidMax = 20;
export const UsernameMin = 6;
export const UsernameMax = 32;

export const UID_SHAPE = yup
  .string()
  .min(UidMin, UidLengthMessage)
  .max(UidMax, UidLengthMessage)
  .required()
  .trim()
  .matches(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/, UidRegexMessage)
  .label("Uid");
export const USERNAME_SHAPE = yup
  .string()
  .min(UsernameMin, UsernameLengthMessage)
  .max(UsernameMax, UsernameLengthMessage)
  .required()
  .trim()
  .label("Username");
export const EMAIL_SHAPE = yup
  .string()
  .max(255)
  .required()
  .trim()
  .lowercase()
  .email(EmailInvalidMessage)
  .label("Email");
export const PASSWORD_SHAPE = yup
  .string()
  .min(6, PasswordLengthMessage)
  .max(255)
  .required()
  .label("Password");
export const AUTH_CODE_SHAPE = yup.string().required().label("Code");

// Login
export const LoginValidationSchema = yup.object().shape({
  email: EMAIL_SHAPE,
  password: PASSWORD_SHAPE,
});

// Register
export const RegisterOneValidationSchema = yup.object().shape({
  uid: UID_SHAPE,
  username: USERNAME_SHAPE,
  email: EMAIL_SHAPE,
  birthdate: BIRTHDATE_SHAPE,
});

export const RegisterTwoValidationSchema = yup.object().shape({
  code: AUTH_CODE_SHAPE,
});

export const RegisterThreeValidationSchema = yup.object().shape({
  password: PASSWORD_SHAPE,
});

export const RegisterFourValidationSchema = yup.object().shape({
  uid: UID_SHAPE,
  username: USERNAME_SHAPE,
  email: EMAIL_SHAPE,
  birthdate: BIRTHDATE_SHAPE,
  code: AUTH_CODE_SHAPE,
  password: PASSWORD_SHAPE,
});

// Account Delete
export const AccountDeletionOne = yup.object().shape({
  code: AUTH_CODE_SHAPE,
});

export const AccountDeletionTwo = yup.object().shape({
  password: PASSWORD_SHAPE,
});

// Forgot/Reset password
export const ForgotPasswordValidationSchema = yup.object().shape({
  email: EMAIL_SHAPE,
});

export const ResetPasswordValidationSchema = yup.object().shape({
  password: PASSWORD_SHAPE,
});
