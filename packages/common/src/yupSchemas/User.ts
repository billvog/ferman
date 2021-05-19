import * as yup from "yup";
import { BIRTHDATE_SHAPE } from "./Profile";

const UidLengthKey = "uid_length";
const UidRegexKey = "uid_format";
const UsernameLengthKey = "username_length";
const EmailInvalidKey = "email_invalid";
const PasswordLengthKey = "password_length";
const SixDigitCodeLengthKey = "six_digit_length";

export const UidMin = 2;
export const UidMax = 20;
export const UsernameMin = 6;
export const UsernameMax = 32;

export const UID_SHAPE = yup
  .string()
  .min(UidMin, UidLengthKey)
  .max(UidMax, UidLengthKey)
  .required(UidLengthKey)
  .trim()
  .matches(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/, UidRegexKey)
  .label("Uid");
export const USERNAME_SHAPE = yup
  .string()
  .min(UsernameMin, UsernameLengthKey)
  .max(UsernameMax, UsernameLengthKey)
  .required(UsernameLengthKey)
  .trim()
  .label("Username");
export const EMAIL_SHAPE = yup
  .string()
  .max(255)
  .required(EmailInvalidKey)
  .trim()
  .lowercase()
  .email(EmailInvalidKey)
  .label("Email");
export const PASSWORD_SHAPE = yup
  .string()
  .min(6, PasswordLengthKey)
  .max(255)
  .required(PasswordLengthKey)
  .label("Password");
export const AUTH_CODE_SHAPE = yup
  .string()
  .required(SixDigitCodeLengthKey)
  .label("6-Digit Code");

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
