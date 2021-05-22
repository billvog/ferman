import { MutationFunctionOptions } from "@apollo/react-common";
import {
  LikePostMutation,
  LikePostMutationVariables,
} from "../../generated/graphql";

export const likePostMutationOptions = (
  variables: LikePostMutationVariables
): MutationFunctionOptions<LikePostMutation> => {
  return {
    variables,
  };
};
