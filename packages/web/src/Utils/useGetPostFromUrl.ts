import { usePostQuery } from "../generated/graphql";
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
