import * as yup from "yup";

export const USER_UID_SHAPE = yup
  .string()
  .min(2, "Length must be between 2 and 20")
  .max(20, "Length must be between 2 and 20")
  .required()
  .trim()
  .matches(
    /^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/,
    "Allowed characters: latin letters, numbers, dashes. The first and last character cannot be a dash."
  );
export const USER_USERNAME_SHAPE = yup
  .string()
  .min(6)
  .max(32)
  .required()
  .trim();
export const USER_EMAIL_SHAPE = yup
  .string()
  .max(255)
  .required()
  .trim()
  .lowercase()
  .email("Please enter a valid email");
export const USER_BIRTHDATE_SHAPE = yup
  .date()
  .max(
    new Date(new Date(0).setFullYear(new Date().getFullYear() - 13)),
    "You must be at least 13 years old to use our services."
  );
export const USER_PASSWORD_SHAPE = yup.string().min(6).max(255).required();

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
