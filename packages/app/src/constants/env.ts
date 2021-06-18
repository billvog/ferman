export const apiBaseUrl = __DEV__
  ? "http://192.168.1.5:4000/graphql"
  : "https://api.ferman.ga/graphql";
export const wsBaseUrl = __DEV__
  ? "ws://192.168.1.5:4000/graphql"
  : "wss://api.ferman.ga/graphql";
