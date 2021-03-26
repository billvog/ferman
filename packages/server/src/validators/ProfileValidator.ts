import { FieldError } from "../resolvers/FieldError";

export const ValidateBio = (bio: string): FieldError | null => {
  if (bio.length > 160) {
    return {
      field: "bio",
      message: "Length must be up to 160",
    };
  }

  return null;
};

export const ValidateLocation = (location: string): FieldError | null => {
  if (location.length > 30) {
    return {
      field: "location",
      message: "Length must be up to 30",
    };
  }

  return null;
};

export const validateBirthdate = (birthdate: string): FieldError | null => {
  if (
    !birthdate ||
    new Date().getFullYear() - new Date(birthdate).getFullYear() < 13
  ) {
    return {
      field: "birthdate",
      message: "You have to be at least 13 years old to use our services",
    };
  }

  return null;
};
