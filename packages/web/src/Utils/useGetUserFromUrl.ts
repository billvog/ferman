import { useUserQuery } from "@ferman/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetUserFromUrl = () => {
  const stringId = useGetStringId();
  return useUserQuery({
    skip: stringId === "",
    variables: {
      uid: stringId,
    },
  });
};
