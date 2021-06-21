import { gql } from "@apollo/client";
import {
  OnUserStatusUpdateDocument,
  OnUserStatusUpdateSubscription,
  UserDocument,
  useUserQuery,
} from "@ferman-pkgs/controller";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CommonBottomNav } from "../../../components/CommonBottomNav";
import { CommonSidebar } from "../../../components/CommonSidebar";
import { MainGrid } from "../../../components/MainGrid";
import { MySpinner } from "../../../components/MySpinner";
import { WaitAuth } from "../../../components/WaitAuth";
import { WaitI18 } from "../../../components/WaitI18";
import { useGetChatFromUrl } from "../../../shared-hooks/useGetChatFromUrl";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../../utils/withMyApollo";
import { AuthContext } from "../../auth/AuthProvider";
import { HeaderController } from "../../display/HeaderController";
import { ChatroomConnector } from "./ChatroomConnector";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);
  const router = useRouter();

  const [otherUserId, setOtherUserId] = useState(-1);
  const { data: chatData } = useGetChatFromUrl();
  const {
    data: otherUserData,
    loading: otherUserLoading,
    variables: otherUserVariables,
    subscribeToMore,
    client,
  } = useUserQuery({
    skip: otherUserId === -1,
    variables: {
      id: otherUserId,
    },
  });

  useEffect(() => {
    if (me?.id && chatData?.chat.chat) {
      setOtherUserId(
        me.id === chatData.chat.chat.senderId
          ? chatData.chat.chat.recieverId
          : chatData.chat.chat.senderId
      );
    }
  }, [chatData, me]);

  useEffect(() => {
    if (otherUserId === -1) return;

    const unsubscribe = subscribeToMore<OnUserStatusUpdateSubscription>({
      document: OnUserStatusUpdateDocument,
      variables: {
        id: otherUserId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data.onUserStatusUpdate) {
          const userStatus = subscriptionData.data.onUserStatusUpdate;
          client.cache.writeFragment({
            id: "User:" + userStatus.id,
            fragment: gql`
              fragment _ on User {
                isOnline
                lastSeen
              }
            `,
            data: {
              isOnline: userStatus.isOnline,
              lastSeen: userStatus.lastSeen,
            },
          });

          return (
            client.cache.readQuery({
              query: UserDocument,
              variables: otherUserVariables,
            }) || prev
          );
        }

        return prev;
      },
    });

    return () => {
      unsubscribe();
    };
  }, [otherUserId]);

  return (
    <WaitI18>
      <WaitAuth RequireLoggedIn>
        <HeaderController
          title={
            me && chatData?.chat.chat
              ? t("chat.chat_with").replace(
                  "%user1%",
                  otherUserData?.user?.username || ""
                )
              : undefined
          }
        />
        <MainGrid
          title={
            <div>
              {otherUserData?.user ? (
                <div
                  className="ml-2 flex flex-row items-center cursor-pointer group"
                  onClick={() =>
                    router.push(`/user/${otherUserData.user?.uid}`)
                  }
                >
                  <div className="mr-2.5">
                    <div className="relative">
                      <img
                        src={otherUserData.user.profile?.avatarUrl}
                        className="w-7 h-7 rounded-35"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <div
                          className={`w-2 h-2 rounded-full ring-2 ring-primary-100 ${
                            otherUserData.user.isOnline
                              ? "bg-green-500"
                              : "bg-yellow-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="text-md text-primary-500 font-semibold group-hover:underline">
                      {otherUserData.user.uid}
                    </div>
                    <div className="text-xs leading-none">
                      {otherUserData.user.isOnline
                        ? t("user.active_now")
                        : t("user.last_seen").replace(
                            "%time%",
                            dayjs(
                              parseFloat(otherUserData.user.lastSeen)
                            ).fromNow(true)
                          )}
                    </div>
                  </div>
                </div>
              ) : !otherUserLoading && otherUserData ? (
                <div
                  className="pl-2 flex items-center"
                  style={{
                    height: "33px",
                  }}
                >
                  {t("common.error")}
                </div>
              ) : (
                <div
                  className="pl-4 flex items-center"
                  style={{
                    height: "33px",
                  }}
                >
                  <MySpinner size="tiny" />
                </div>
              )}
            </div>
          }
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <ChatroomConnector />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const ChatPage = withMyApollo({ ssr: false })(Page);
