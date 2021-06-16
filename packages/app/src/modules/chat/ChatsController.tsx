import { gql } from "@apollo/client";
import {
  OnNewMessageDocument,
  OnNewMessageSubscription,
  OnNewMessageSubscriptionVariables,
  useChatsQuery,
} from "@ferman-pkgs/controller";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../components/CenterSpinner";
import { Chat } from "../../components/Chat";
import { MyButton } from "../../components/MyButton";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { HomeNavProps } from "../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const ChatsController: React.FC<any> = ({
  navigation,
}: HomeNavProps<"Chats">) => {
  const { t } = useTypeSafeTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: chatsData,
    error: chatsError,
    loading: chatsLoading,
    refetch: refreshChats,
    fetchMore: loadMoreChats,
    variables: chatsVariables,
    subscribeToMore,
    client,
  } = useChatsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: 0,
    },
  });

  useEffect(() => {
    const unsubFromNewChatMessage = subscribeToMore<
      OnNewMessageSubscription,
      OnNewMessageSubscriptionVariables
    >({
      document: OnNewMessageDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onNewMessage) {
          const m = subscriptionData.data.onNewMessage;
          client.cache.writeFragment({
            id: "Chat:" + m.chatId,
            fragment: gql`
              fragment _ on Chat {
                hasUnreadMessage
                latestMessage
              }
            `,
            data: {
              hasUnreadMessage: true,
              latestMessage: m,
            },
          });
        }

        return {
          chats: {
            ...prev.chats,
            chats: [],
          },
        };
      },
    });

    return () => {
      unsubFromNewChatMessage();
    };
  }, []);

  const refreshChatsHandler = async () => {
    // update state
    setIsRefreshing(true);
    // clear cache from query
    client.cache.evict({
      fieldName: "chats",
    });
    // refetch
    await refreshChats({
      ...chatsVariables,
      skip: 0,
    });
    // update state
    setIsRefreshing(false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!chatsData && chatsLoading && !isRefreshing ? (
        <CenterSpinner />
      ) : !chatsData && chatsError ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.error,
              fontSize: fontSize.h5,
              fontFamily: fontFamily.inter.medium,
              marginBottom: 16,
            }}
          >
            {t("errors.500")}
          </Text>
          <MyButton
            color="danger"
            onPress={refreshChatsHandler}
            isLoading={chatsLoading}
          >
            Retry
          </MyButton>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollViewLoadMore
            isLoading={chatsLoading && !isRefreshing}
            isRefreshing={isRefreshing}
            onRefresh={refreshChatsHandler}
            onLoadMore={() => {
              loadMoreChats({
                variables: {
                  ...chatsVariables,
                  skip: chatsData?.chats.chats.length,
                },
              });
            }}
            shouldLoadMore={chatsData?.chats.hasMore || false}
            scrollViewProps={{
              style: {
                flex: 1,
              },
            }}
          >
            {chatsData?.chats.count === 0 ? (
              <View
                style={{
                  marginTop: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.primary500,
                    fontSize: fontSize.h5,
                    fontFamily: fontFamily.inter.medium,
                  }}
                >
                  {t("chat.you_have_no_chats")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                {chatsData?.chats.chats.map((c) => (
                  <Chat key={`my-chats:${c.id}`} chat={c} />
                ))}
              </View>
            )}
          </ScrollViewLoadMore>
        </View>
      )}
    </View>
  );
};
