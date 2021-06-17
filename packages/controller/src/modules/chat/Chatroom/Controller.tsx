import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import {
  FullChatFragment,
  MessagesDocument,
  OnMessageDeletedDocument,
  OnMessageDeletedSubscription,
  OnMessageDeletedSubscriptionVariables,
  OnMessageUpdatedDocument,
  OnMessageUpdatedSubscription,
  OnMessageUpdatedSubscriptionVariables,
  OnNewMessageDocument,
  OnNewMessageSubscription,
  OnNewMessageSubscriptionVariables,
  PaginatedMessages,
  useChatQuery,
  useMessagesQuery,
  useSendMessageMutation,
} from "../../../generated/graphql";

export interface SendMessageFormValues {
  text: string;
}

interface ChatroomControllerProps {
  chatId: string;
  children: (data: {
    isLoading: boolean;
    chat: FullChatFragment | null;
    messages: PaginatedMessages | null;
    loadMoreMessages: () => void;
    sendMessage: (values: SendMessageFormValues) => Promise<string | null>;
  }) => JSX.Element | null;
}

export const ChatroomController: React.FC<ChatroomControllerProps> = ({
  chatId,
  children,
}) => {
  const { data: chatData, loading: chatLoading } = useChatQuery({
    variables: {
      chatId,
    },
  });

  const {
    data: messagesData,
    loading: messagesLoading,
    fetchMore: fetchMoreMessages,
    variables: messagesVariables,
    subscribeToMore: subscribeToMoreMessages,
    client,
  } = useMessagesQuery({
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    skip: !chatData?.chat.chat?.id,
    variables: {
      chatId: chatData?.chat.chat?.id || "",
      limit: 15,
      skip: 0,
    },
  });

  useEffect(() => {
    if (!chatData?.chat.chat) return;

    const unsubFromNewMessage = subscribeToMoreMessages<
      OnNewMessageSubscription,
      OnNewMessageSubscriptionVariables
    >({
      document: OnNewMessageDocument,
      variables: {
        chatId: chatData.chat.chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.onNewMessage) return prev;

        if (subscriptionData.data.onNewMessage) {
          const m = subscriptionData.data.onNewMessage;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment _ on Chat {
                latestMessage
              }
            `,
            data: {
              latestMessage: m,
            },
          });
        }

        return {
          messages: {
            ...prev.messages,
            messages: [
              subscriptionData.data.onNewMessage,
              ...prev.messages.messages,
            ],
          },
        };
      },
    });

    const unsubFromMessageUpdated = subscribeToMoreMessages<
      OnMessageUpdatedSubscription,
      OnMessageUpdatedSubscriptionVariables
    >({
      document: OnMessageUpdatedDocument,
      variables: {
        chatId: chatData.chat.chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onMessageUpdated) {
          const m = subscriptionData.data.onMessageUpdated;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment _ on Chat {
                latestMessage
              }
            `,
            data: {
              latestMessage: m,
            },
          });
        }

        return prev;
      },
    });

    const unsubFromMessageDeleted = subscribeToMoreMessages<
      OnMessageDeletedSubscription,
      OnMessageDeletedSubscriptionVariables
    >({
      document: OnMessageDeletedDocument,
      variables: {
        chatId: chatData.chat.chat.id,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onMessageDeleted) {
          client.cache.evict({
            id: "Message:" + subscriptionData.data.onMessageDeleted,
          });

          return (
            client.cache.readQuery({
              query: MessagesDocument,
              variables: messagesVariables,
            }) || prev
          );
        }

        return prev;
      },
    });

    return () => {
      unsubFromNewMessage();
      unsubFromMessageUpdated();
      unsubFromMessageDeleted();
    };
  }, [chatData?.chat.chat?.id]);

  const [sendMessage] = useSendMessageMutation();

  const sendNewMessageHandler = async (
    values: SendMessageFormValues
  ): Promise<string | null> => {
    const { data } = await sendMessage({
      variables: {
        chatId: chatData?.chat.chat?.id || "",
        options: values,
      },
    });

    if (data?.sendMessage.error) {
      return `form.error.${data.sendMessage.error.message}`;
    }

    return null;
  };

  const loadMoreHandler = () => {
    if (!messagesData?.messages.hasMore) return;
    fetchMoreMessages({
      variables: {
        ...messagesVariables,
        skip: messagesData?.messages.messages.length || 0,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        return {
          messages: {
            ...fetchMoreResult.messages,
            messages: [
              ...prev.messages.messages,
              ...fetchMoreResult.messages.messages,
            ],
          },
        };
      },
    });
  };

  return children({
    isLoading: messagesLoading || chatLoading,
    chat: chatData?.chat.chat || null,
    messages: (messagesData?.messages as any) || null,
    loadMoreMessages: loadMoreHandler,
    sendMessage: sendNewMessageHandler as any,
  });
};
