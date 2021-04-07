import * as yup from "yup";

const BodyLengthMessage = "Length must be between 3 and 500";

export const TitleMax = 60;
export const BodyMin = 3;
export const BodyMax = 500;

export const BODY_SHAPE = yup
  .string()
  .min(BodyMin, BodyLengthMessage)
  .max(BodyMax, BodyLengthMessage)
  .required()
  .trim();

export const PostValidationSchema = yup.object().shape({
  body: BODY_SHAPE,
});
