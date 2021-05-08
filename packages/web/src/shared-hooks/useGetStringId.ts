import { useRouter } from "next/router";

export const useGetStringId = () => {
  const router = useRouter();
  const stringId = typeof router.query.id === "string" ? router.query.id : "";
  return stringId;
};
