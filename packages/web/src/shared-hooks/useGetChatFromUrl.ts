import { useChatQuery } from "@ferman-pkgs/controller";
import { useGetStringId } from "./useGetStringId";

export const useGetChatFromUrl = () => {
  const id = useGetStringId("chatId");
  return useChatQuery({
    skip: id === "",
    variables: {
      chatId: id,
    },
  });
};
