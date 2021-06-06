import { MessagesQuery, NewMessageSubscription } from "../../generated/graphql";

export const onMessageUpdateCache = (
  prev: MessagesQuery,
  result: {
    data: NewMessageSubscription;
  }
): MessagesQuery => {
  if (!result) {
    return prev;
  }

  const index = prev.messages.messages.findIndex(
    (x) => x.id === result.data.newMessage?.id
  );

  if (index !== -1) {
    const prevMessages = [...prev.messages.messages];
    prevMessages[index] = result.data.newMessage!;
    return {
      ...prev,
      messages: {
        ...prev.messages,
        messages: prevMessages,
      },
    };
  }

  return {
    messages: {
      ...prev.messages,
      messages: [result.data.newMessage!, ...prev.messages.messages],
    },
  };
};
