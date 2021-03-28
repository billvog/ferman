import * as yup from "yup";
import { USERNAME_SHAPE } from "./User";

const BioLengthMessage = "Length must be up to 160";
const LocationLengthMessage = "Length must be up to 30";
const BirthdateLimitMessage =
  "You must be at least 13 years old to use our services.";

export const BIO_SHAPE = yup.string().max(160, BioLengthMessage).trim();
export const LOCATION_SHAPE = yup
  .string()
  .max(30, LocationLengthMessage)
  .trim();
export const BIRTHDATE_SHAPE = yup
  .date()
  .max(
    new Date(new Date(0).setFullYear(new Date().getFullYear() - 13)),
    BirthdateLimitMessage
  );
export const SHOWBIRTHDATE_SHAPE = yup.boolean();

export const ProfileValidationSchema = yup.object().shape({
  username: USERNAME_SHAPE,
  bio: BIO_SHAPE,
  location: LOCATION_SHAPE,
  birthdate: BIRTHDATE_SHAPE,
  showBirthdate: SHOWBIRTHDATE_SHAPE,
});
