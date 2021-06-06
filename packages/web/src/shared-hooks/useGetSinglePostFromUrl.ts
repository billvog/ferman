import { usePostQuery } from "@ferman-pkgs/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetSinglePostFromUrl = () => {
  const id = useGetStringId("postId");
  return usePostQuery({
    skip: id === "",
    variables: {
      id: id,
    },
  });
};
