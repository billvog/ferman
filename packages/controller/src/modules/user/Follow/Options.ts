import { ApolloCache, ApolloQueryResult } from "@apollo/client";
import { MutationFunctionOptions } from "@apollo/react-common";
import {
  FollowMutationVariables,
  FollowMutation,
} from "../../../generated/graphql";

export const followMutationOptions = (
  variables: FollowMutationVariables
): MutationFunctionOptions<FollowMutation> => {
  return {
    variables,
    update: (
      cache: ApolloCache<FollowMutation>,
      result: ApolloQueryResult<FollowMutation>
    ) => {
      if (result.data.follow.error) return;
      cache.evict({ fieldName: "followings" });
      cache.evict({ fieldName: "followers" });
    },
  };
};
