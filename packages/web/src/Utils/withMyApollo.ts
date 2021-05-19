import { MyApolloClient } from "@ferman-pkgs/controller";
import { withApollo } from "next-apollo";
import { apiBaseUrl } from "../lib/constants";
import { isServer } from "./isServer";

const createApolloClient = (ctx: any) => {
  let cookie = "";
  if (isServer() && ctx) {
    cookie = ctx.req.headers.cookie;
  }

  return MyApolloClient(apiBaseUrl, cookie);
};

export const withMyApollo = withApollo(createApolloClient);
