import { ApolloCache, ApolloQueryResult } from "@apollo/client";
import { MutationFunctionOptions } from "@apollo/react-common";
import {
  DeleteCommentMutationVariables,
  DeleteCommentMutation,
} from "../../generated/graphql";

export const deleteCommentMutationOptions = (
  variables: DeleteCommentMutationVariables
): MutationFunctionOptions<DeleteCommentMutation> => {
  return {
    variables,
    update: (
      cache: ApolloCache<DeleteCommentMutation>,
      result: ApolloQueryResult<DeleteCommentMutation>
    ) => {
      if (result.data.deleteComment.error) return;
      if (result.data.deleteComment.parentCommentId)
        cache.evict({
          id: "Comment:" + result.data.deleteComment.parentCommentId,
        });
      cache.evict({ id: "Comment:" + result.data.deleteComment.commentId });
      cache.evict({ id: "Post:" + result.data.deleteComment.postId });
    },
  };
};
