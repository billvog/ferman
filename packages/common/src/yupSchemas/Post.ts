import * as yup from "yup";

const TitleLengthMessage = "Length must be between 3 and 60";
const BodyLengthMessage = "Length must be between 3 and 500";

export const TitleMin = 3;
export const TitleMax = 60;
export const BodyMin = 3;
export const BodyMax = 500;

export const TITLE_SHAPE = yup
  .string()
  .min(TitleMin, TitleLengthMessage)
  .max(TitleMax, TitleLengthMessage)
  .required()
  .trim();
export const BODY_SHAPE = yup
  .string()
  .min(BodyMin, BodyLengthMessage)
  .max(BodyMax, BodyLengthMessage)
  .required()
  .trim();

export const PostValidationSchema = yup.object().shape({
  title: TITLE_SHAPE,
  body: BODY_SHAPE,
});
