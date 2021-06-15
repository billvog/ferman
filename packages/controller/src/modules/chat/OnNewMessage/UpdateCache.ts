import {
  MessagesQuery,
  OnNewMessageSubscription,
} from "../../../generated/graphql";

export const onMessageUpdateCache = (
  prev: MessagesQuery,
  result: {
    data: OnNewMessageSubscription;
  }
): MessagesQuery => {
  if (!result) {
    return prev;
  }

  const index = prev.messages.messages.findIndex(
    (x) => x.id === result.data.onNewMessage?.id
  );

  if (index !== -1) {
    const prevMessages = [...prev.messages.messages];
    prevMessages[index] = result.data.onNewMessage!;
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
      messages: [result.data.onNewMessage!, ...prev.messages.messages],
    },
  };
};
