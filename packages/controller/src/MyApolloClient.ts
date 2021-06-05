import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import {
  PaginatedUsers,
  PaginatedPosts,
  PaginatedMessages,
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
          timeout: 20000,
          lazy: true,
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
              keyArgs: ["id", "query", "location", "notMe"],
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
            messages: {
              keyArgs: ["chatId"],
              merge(
                existing: PaginatedMessages | undefined,
                incoming: PaginatedMessages
              ): PaginatedMessages {
                if (existing === undefined) {
                  return incoming;
                }

                let hasDuplicates = false;

                incoming.messages.map((x) => {
                  let inRef = (x as any).__ref as string;
                  inRef = inRef.slice(8, inRef.length);

                  existing.messages.map((y) => {
                    let exRef = (y as any).__ref as string;
                    exRef = exRef.slice(8, exRef.length);

                    if (inRef === exRef) {
                      hasDuplicates = true;
                    }
                  });
                });

                if (hasDuplicates) {
                  return incoming;
                }

                return {
                  ...incoming,
                  messages: [...existing.messages, ...incoming.messages],
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
