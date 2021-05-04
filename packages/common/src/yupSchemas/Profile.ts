import * as yup from "yup";

const UsernameLengthMessage = "Length must be between 6 and 32";
const BioLengthMessage = "Length must be up to 160";
const LocationLengthMessage = "Length must be up to 30";
const BirthdateLimitMessage =
  "You must be at least 13 years old to use our services.";

const UsernameMin = 6;
const UsernameMax = 32;
export const BioMax = 160;
export const LocationMax = 30;

const USERNAME_SHAPE = yup
  .string()
  .min(UsernameMin, UsernameLengthMessage)
  .max(UsernameMax, UsernameLengthMessage)
  .required()
  .trim()
  .label("Username");
export const BIO_SHAPE = yup
  .string()
  .max(BioMax, BioLengthMessage)
  .trim()
  .label("Bio");
export const LOCATION_SHAPE = yup
  .string()
  .max(LocationMax, LocationLengthMessage)
  .trim()
  .label("Location");
export const BIRTHDATE_SHAPE = yup
  .date()
  .max(
    new Date(new Date(0).setFullYear(new Date().getFullYear() - 13)),
    BirthdateLimitMessage
  )
  .label("Birthday");
export const SHOWBIRTHDATE_SHAPE = yup.boolean();

export const UpdateProfileValidationSchema = yup.object().shape({
  username: USERNAME_SHAPE,
  bio: BIO_SHAPE,
  location: LOCATION_SHAPE,
  showBirthdate: SHOWBIRTHDATE_SHAPE,
});
