export const __prod__ = process.env.NODE_ENV === "production";
export const SESSION_COOKIE_NAME = "qid";
export const FRONTEND_URL = __prod__
  ? "https://ferman.ga"
  : "http://localhost:3000";

// TOKEN PREFIXES
export const PROCEED_REGISTER_TOKEN_PREFIX = "proceed-register:";
export const PROCEED_ACC_DEL_TOKEN_PREFIX = "proceed-account-deletion:";
export const FORGOT_PWD_TOKEN_PREFIX = "forgot-password:";
