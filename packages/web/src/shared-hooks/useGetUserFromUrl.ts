import { useUserQuery } from "@ferman-pkgs/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetUserFromUrl = () => {
  const stringId = useGetStringId("uid");
  return useUserQuery({
    skip: stringId === "",
    variables: {
      uid: stringId,
    },
  });
};
