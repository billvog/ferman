import * as yup from "yup";

const TextLengthMessage = "Length must be between 3 and 200";

export const CommentMin = 3;
export const CommentMax = 200;

export const COMMENT_TEXT_SHAPE = yup
  .string()
  .min(CommentMin, TextLengthMessage)
  .max(CommentMax, TextLengthMessage)
  .required()
  .trim()
  .label("Text");

export const CommentValidationSchema = yup.object().shape({
  text: COMMENT_TEXT_SHAPE,
});
