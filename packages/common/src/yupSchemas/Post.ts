import * as yup from "yup";

const BodyLengthKey = "post_body_length";

export const BodyMin = 3;
export const BodyMax = 500;

export const BODY_SHAPE = yup
  .string()
  .min(BodyMin, BodyLengthKey)
  .max(BodyMax, BodyLengthKey)
  .required(BodyLengthKey)
  .trim()
  .label("Body");

export const PostValidationSchema = yup.object().shape({
  body: BODY_SHAPE,
});
