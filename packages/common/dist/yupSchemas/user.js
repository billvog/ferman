"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordValidationSchema = exports.ForgotPasswordValidationSchema = exports.RegisterValidationSchema = exports.LoginValidationSchema = void 0;
const yup = require("yup");
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
exports.LoginValidationSchema = yup.object().shape({
    email: USER_EMAIL_SHAPE,
    password: USER_PASSWORD_SHAPE,
});
exports.RegisterValidationSchema = yup.object().shape({
    uid: USER_UID_SHAPE,
    username: USER_USERNAME_SHAPE,
    email: USER_EMAIL_SHAPE,
    password: USER_PASSWORD_SHAPE,
    birthdate: USER_BIRTHDATE_SHAPE,
});
exports.ForgotPasswordValidationSchema = yup.object().shape({
    email: USER_EMAIL_SHAPE,
});
exports.ResetPasswordValidationSchema = yup.object().shape({
    password: USER_PASSWORD_SHAPE,
});
//# sourceMappingURL=user.js.map