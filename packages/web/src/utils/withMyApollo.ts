import { ApolloClient, InMemoryCache, Reference } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedPosts } from "../generated/graphql";
import { isServer } from "./isServer";

const createApolloClient = (ctx: any) => {
  let cookie = "";
  if (isServer() && ctx) {
    cookie = ctx.req.headers.cookie;
  }

  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include",
    headers: {
      cookie,
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: ["userId", "query"],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });
};

export const withMyApollo = createWithApollo(createApolloClient);
