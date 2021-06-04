import * as yup from "yup";

const TextLengthKey = "message_text_length";

export const ChatMessageMin = 1;
export const ChatMessageMax = 500;

export const CHAT_MESSAGE_TEXT_SHAPE = yup
  .string()
  .min(ChatMessageMin, TextLengthKey)
  .max(ChatMessageMax, TextLengthKey)
  .required(TextLengthKey)
  .trim()
  .label("Message");

export const ChatMessageValidationSchema = yup.object().shape({
  text: CHAT_MESSAGE_TEXT_SHAPE,
});
