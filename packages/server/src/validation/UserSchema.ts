import * as yup from "yup";
import { BIRTHDATE_SHAPE } from "./ProfileShema";

export const UID_SHAPE = yup
  .string()
  .min(2, "Length must be between 2 and 20")
  .max(20, "Length must be between 2 and 20")
  .required()
  .trim()
  .matches(
    /^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/,
    "Allowed characters: latin letters, numbers, dashes. The first and last character cannot be a dash."
  );
export const USERNAME_SHAPE = yup.string().min(6).max(32).required().trim();
export const EMAIL_SHAPE = yup
  .string()
  .max(255)
  .required()
  .trim()
  .lowercase()
  .email("Please enter a valid email");
export const PASSWORD_SHAPE = yup.string().min(6).max(255).required();

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
