import { ApolloCache, ApolloQueryResult } from "@apollo/client";
import { MutationFunctionOptions } from "@apollo/react-common";
import {
  DeletePostMutationVariables,
  DeletePostMutation,
} from "../../generated/graphql";

export const deletePostMutationOptions = (
  variables: DeletePostMutationVariables
): MutationFunctionOptions<DeletePostMutation> => {
  return {
    variables,
    update: (
      cache: ApolloCache<DeletePostMutation>,
      result: ApolloQueryResult<DeletePostMutation>
    ) => {
      if (result.data.deletePost.error) return;
      cache.evict({ id: "Post:" + result.data.deletePost.postId });
    },
  };
};
