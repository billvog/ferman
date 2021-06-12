export const __prod__ = process.env.NODE_ENV === "production";
export const apiBaseUrl = __prod__
  ? "https://api.ferman.ga/graphql"
  : "http://192.168.1.9:4000/graphql";
export const wsBaseUrl = __prod__
  ? "wss://api.ferman.ga/graphql"
  : "ws://192.168.1.9:4000/graphql";
