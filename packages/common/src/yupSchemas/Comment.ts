import * as yup from "yup";

const TextLengthMessage = "Length must be between 3 and 200";

export const COMMENT_TEXT_SHAPE = yup
  .string()
  .min(3, TextLengthMessage)
  .max(200, TextLengthMessage)
  .required()
  .trim();
