"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordValidationSchema = exports.ForgotPasswordValidationSchema = exports.RegisterValidationSchema = exports.LoginValidationSchema = exports.USER_PASSWORD_SHAPE = exports.USER_BIRTHDATE_SHAPE = exports.USER_EMAIL_SHAPE = exports.USER_USERNAME_SHAPE = exports.USER_UID_SHAPE = void 0;
const yup = require("yup");
exports.USER_UID_SHAPE = yup
    .string()
    .min(2, "Length must be between 2 and 20")
    .max(20, "Length must be between 2 and 20")
    .required()
    .trim()
    .matches(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/, "Allowed characters: latin letters, numbers, dashes. The first and last character cannot be a dash.");
exports.USER_USERNAME_SHAPE = yup
    .string()
    .min(6)
    .max(32)
    .required()
    .trim();
exports.USER_EMAIL_SHAPE = yup
    .string()
    .max(255)
    .required()
    .trim()
    .lowercase()
    .email("Please enter a valid email");
exports.USER_BIRTHDATE_SHAPE = yup
    .date()
    .max(new Date(new Date(0).setFullYear(new Date().getFullYear() - 13)), "You must be at least 13 years old to use our services.");
exports.USER_PASSWORD_SHAPE = yup.string().min(6).max(255).required();
exports.LoginValidationSchema = yup.object().shape({
    email: exports.USER_EMAIL_SHAPE,
    password: exports.USER_PASSWORD_SHAPE,
});
exports.RegisterValidationSchema = yup.object().shape({
    uid: exports.USER_UID_SHAPE,
    username: exports.USER_USERNAME_SHAPE,
    email: exports.USER_EMAIL_SHAPE,
    birthdate: exports.USER_BIRTHDATE_SHAPE,
});
exports.ForgotPasswordValidationSchema = yup.object().shape({
    email: exports.USER_EMAIL_SHAPE,
});
exports.ResetPasswordValidationSchema = yup.object().shape({
    password: exports.USER_PASSWORD_SHAPE,
});
//# sourceMappingURL=user.js.map