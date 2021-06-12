export const __prod__ = process.env.NODE_ENV === "production";
export const apiBaseUrl = __prod__
  ? "https://api.ferman.ga/graphql"
  : "http://localhost:4000/graphql";
export const wsBaseUrl = __prod__
  ? "wss://api.ferman.ga/graphql"
  : "ws://localhost:4000/graphql";
