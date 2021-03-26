import { ApolloClient, InMemoryCache, Reference } from "@apollo/client";
import { PaginatedPosts } from "../generated/graphql";

export const apolloClient = new ApolloClient({
  uri: "http://192.168.1.4:4000/graphql" as string,
  // uri: "https://api.ferman.ga/graphql" as string,
  credentials: "include",
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
