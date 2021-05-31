import { MyApolloClient } from "@ferman-pkgs/controller";
import { withApollo } from "next-apollo";
import { ApiUrl, WebSocketUrl } from "../lib/constants";
import { isServer } from "./isServer";

const createApolloClient = (ctx: any) => {
  let cookie = "";
  if (isServer() && ctx) {
    cookie = ctx.req.headers.cookie;
  }

  return MyApolloClient(ApiUrl, WebSocketUrl, cookie);
};

export const withMyApollo = withApollo(createApolloClient);
