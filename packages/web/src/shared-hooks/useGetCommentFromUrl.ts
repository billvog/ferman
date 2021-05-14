import { useCommentQuery } from "@ferman-pkgs/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetCommentFromUrl = () => {
  const id = useGetStringId("commentId");
  return useCommentQuery({
    skip: id === "",
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
      limit: 15,
      skip: 0,
    },
  });
};
