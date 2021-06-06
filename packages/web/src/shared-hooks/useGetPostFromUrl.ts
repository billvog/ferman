import { PostsQueryVariables, usePostsQuery } from "@ferman-pkgs/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetPostFromUrl = (variables: PostsQueryVariables) => {
  const id = useGetStringId("postId");
  return usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: id === "",
    variables: {
      parentPostId: id,
      ...variables,
    },
  });
};
