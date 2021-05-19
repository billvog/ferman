import { ApolloCache, ApolloQueryResult } from "@apollo/client";
import { MutationFunctionOptions } from "@apollo/react-common";
import {
  LikePostMutation,
  LikePostMutationVariables,
  PostDocument,
  PostQuery,
} from "../../generated/graphql";

export const likePostMutationOptions = (
  variables: LikePostMutationVariables
): MutationFunctionOptions<LikePostMutation> => {
  return {
    variables,
    update: (
      cache: ApolloCache<LikePostMutation>,
      result: ApolloQueryResult<LikePostMutation>
    ) => {
      if (result.data.likePost.error) return;
      cache.writeQuery<PostQuery>({
        query: PostDocument,
        data: {
          post: result.data.likePost.post,
        },
      });
    },
  };
};
