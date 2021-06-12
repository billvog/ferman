import { MyApolloClient } from "@ferman-pkgs/controller";
import { apiBaseUrl, wsBaseUrl } from "../constants/env";
export const ApolloClient = MyApolloClient(apiBaseUrl, wsBaseUrl, "");
