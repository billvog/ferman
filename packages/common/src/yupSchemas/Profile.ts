import * as yup from "yup";

const UsernameLengthKey = "username_length";
const BioLengthKey = "bio_length";
const LocationLengthKey = "location_length";
const BirthdateLimitKey = "birthday_limit";

const UsernameMin = 6;
const UsernameMax = 32;
export const BioMax = 160;
export const LocationMax = 30;

const USERNAME_SHAPE = yup
  .string()
  .min(UsernameMin, UsernameLengthKey)
  .max(UsernameMax, UsernameLengthKey)
  .required(UsernameLengthKey)
  .trim()
  .label("Username");
export const BIO_SHAPE = yup
  .string()
  .max(BioMax, BioLengthKey)
  .trim()
  .label("Bio");
export const LOCATION_SHAPE = yup
  .string()
  .max(LocationMax, LocationLengthKey)
  .trim()
  .label("Location");
export const BIRTHDATE_SHAPE = yup
  .date()
  .max(
    new Date(new Date(0).setFullYear(new Date().getFullYear() - 13)),
    BirthdateLimitKey
  )
  .label("Birthday");
export const SHOWBIRTHDATE_SHAPE = yup.boolean();

export const UpdateProfileValidationSchema = yup.object().shape({
  username: USERNAME_SHAPE,
  bio: BIO_SHAPE,
  location: LOCATION_SHAPE,
  showBirthdate: SHOWBIRTHDATE_SHAPE,
});
