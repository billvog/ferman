import { useRouter } from "next/router";

export const useGetStringId = (name: string) => {
  const router = useRouter();
  const stringId =
    typeof router.query[name] === "string"
      ? (router.query[name] as string)
      : "";
  return stringId;
};
