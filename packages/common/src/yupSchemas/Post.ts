import * as yup from "yup";

const TitleLengthMessage = "Length must be between 3 and 60";
const BodyLengthMessage = "Length must be between 3 and 500";

export const TITLE_SHAPE = yup
  .string()
  .min(3, TitleLengthMessage)
  .max(60, TitleLengthMessage)
  .required()
  .trim();
export const BODY_SHAPE = yup
  .string()
  .min(3, BodyLengthMessage)
  .max(500, BodyLengthMessage)
  .required()
  .trim();

export const PostValidationSchema = yup.object().shape({
  title: TITLE_SHAPE,
  body: BODY_SHAPE,
});
