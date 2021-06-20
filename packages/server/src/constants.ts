export const __prod__ = process.env.NODE_ENV === "production";
export const SESSION_COOKIE_NAME = "qid";
export const FRONTEND_URL = __prod__
  ? "https://ferman.ga"
  : "http://localhost:3000";

// TOKEN PREFIXES
export const PROCEED_REGISTER_TOKEN_PREFIX = "proceed-register:";
export const PROCEED_ACC_DEL_TOKEN_PREFIX = "proceed-account-deletion:";
export const FORGOT_PWD_TOKEN_PREFIX = "forgot-password:";

// SUBSCRIPTION KEYS
// :user
export const UPDATE_USER_STATUS_KEY = "UPDATE_USER_STATUS";
export const UPDATE_MY_USER_KEY = "UPDATE_MY_USER";
// :chat
export const ON_CHAT_UDPATED_KEY = "ON_CHAT_UDPATED";
export const NEW_CHAT_MESSAGE_KEY = "NEW_CHAT_MESSAGE";
export const UPDATE_CHAT_MESSAGE_KEY = "UPDATE_CHAT_MESSAGE";
export const DELETE_CHAT_MESSAGE_KEY = "DELETE_CHAT_MESSAGE";
