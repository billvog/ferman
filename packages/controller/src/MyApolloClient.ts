import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  PaginatedUsers,
  PaginatedPosts,
  PaginatedComments,
} from "./generated/graphql";
import { isServer } from "./utils/isServer";

export const MyApolloClient = (
  ApiUrl: string,
  WebSocketUrl: string,
  AuthCookie: string
) => {
  const httpLink = new HttpLink({
    uri: ApiUrl,
    credentials: "include",
  });

  const wsLink = isServer()
    ? null
    : new WebSocketLink({
        uri: WebSocketUrl,
        options: {
          reconnect: true,
        },
      });

  const splitLink = isServer()
    ? httpLink
    : split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink!,
        httpLink
      );

  return new ApolloClient({
    link: splitLink,
    headers: {
      cookie: AuthCookie,
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            users: {
              keyArgs: ["id", "query", "location"],
              merge(
                existing: PaginatedUsers | undefined,
                incoming: PaginatedUsers
              ): PaginatedUsers {
                return {
                  ...incoming,
                  users: [...(existing?.users || []), ...incoming.users],
                };
              },
            },
            followings: {
              keyArgs: ["userId"],
              merge(
                existing: PaginatedUsers | undefined,
                incoming: PaginatedUsers
              ): PaginatedUsers {
                return {
                  ...incoming,
                  users: [...(existing?.users || []), ...incoming.users],
                };
              },
            },
            followers: {
              keyArgs: ["userId"],
              merge(
                existing: PaginatedUsers | undefined,
                incoming: PaginatedUsers
              ): PaginatedUsers {
                return {
                  ...incoming,
                  users: [...(existing?.users || []), ...incoming.users],
                };
              },
            },
            posts: {
              keyArgs: ["userId", "query", "feedMode"],
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
            comments: {
              keyArgs: ["postId"],
              merge(
                existing: PaginatedComments | undefined,
                incoming: PaginatedComments
              ): PaginatedComments {
                return {
                  ...incoming,
                  comments: [
                    ...(existing?.comments || []),
                    ...incoming.comments,
                  ],
                };
              },
            },
            comment: {
              keyArgs: ["id"],
              merge(
                existing: PaginatedComments | undefined,
                incoming: PaginatedComments
              ): PaginatedComments {
                return {
                  ...incoming,
                  comments: [
                    ...(existing?.comments || []),
                    ...incoming.comments,
                  ],
                };
              },
            },
          },
        },
        User: {
          fields: {
            profile: {
              merge: true,
            },
          },
        },
      },
    }),
  });
};
