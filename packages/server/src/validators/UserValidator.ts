import { FieldError } from "../resolvers/FieldError";

export const validateUid = (uid: string): FieldError | null => {
  if (!uid || uid.length < 2 || uid.length > 20) {
    return {
      field: "uid",
      message: "Length must be between 2 and 20",
    };
  }

  if (!uid.match(/^([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])$/)) {
    return {
      field: "uid",
      message:
        "Allowed characters: latin letters, numbers, dashes. The first and last character cannot be a dash.",
    };
  }

  return null;
};

export const validateUsername = (username: string): FieldError | null => {
  if (!username || username.length < 6 || username.length > 32) {
    return {
      field: "username",
      message: "Length must be between 6 and 32",
    };
  }

  return null;
};

export const validateEmail = (email: string): FieldError | null => {
  if (
    !email ||
    !email.match(
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    )
  ) {
    return {
      field: "email",
      message: "Invalid email",
    };
  }

  return null;
};

export const validatePassword = (password: string): FieldError | null => {
  if (!password || password.length < 6) {
    return {
      field: "password",
      message: "Length must be at least 6",
    };
  }

  return null;
};
