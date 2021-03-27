import * as yup from "yup";
import { USERNAME_SHAPE } from "./UserSchema";

export const BIO_SHAPE = yup.string().max(160).trim();
export const LOCATION_SHAPE = yup.string().max(30).trim();
export const BIRTHDATE_SHAPE = yup
  .date()
  .max(
    new Date(new Date(0).setFullYear(new Date().getFullYear() - 13)),
    "You must be at least 13 years old to use our services."
  );
export const SHOWBIRTHDATE_SHAPE = yup.boolean();

export const ProfileValidationSchema = yup.object().shape({
  username: USER_USERNAME_SHAPE,
  bio: BIO_SHAPE,
  location: LOCATION_SHAPE,
  birthdate: BIRTHDATE_SHAPE,
  showBirthdate: SHOWBIRTHDATE_SHAPE,
});
