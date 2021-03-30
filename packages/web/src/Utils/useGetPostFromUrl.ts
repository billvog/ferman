import { usePostQuery } from "@ferman/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetPostFromUrl = () => {
  const id = useGetStringId();
  return usePostQuery({
    skip: id === "",
    variables: {
      id,
    },
  });
};
