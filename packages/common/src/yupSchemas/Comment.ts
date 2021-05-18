import * as yup from "yup";

const TextLengthKey = "comment_text_length";

export const CommentMin = 3;
export const CommentMax = 200;

export const COMMENT_TEXT_SHAPE = yup
  .string()
  .min(CommentMin, TextLengthKey)
  .max(CommentMax, TextLengthKey)
  .required(TextLengthKey)
  .trim()
  .label("Text");

export const CommentValidationSchema = yup.object().shape({
  text: COMMENT_TEXT_SHAPE,
});
