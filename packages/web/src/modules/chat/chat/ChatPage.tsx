import { gql } from "@apollo/client";
import {
  OnUserStatusUpdateDocument,
  OnUserStatusUpdateSubscription,
  OnUserStatusUpdateSubscriptionVariables,
  useMeQuery,
  UserDocument,
  UserQuery,
  UsersDocument,
  UserStatus,
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
import { ChatController } from "./ChatController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const { me } = useContext(AuthContext);

  const [otherUserId, setOtherUserId] = useState(-1);

  const { data: chatData } = useGetChatFromUrl();
  const {
    data: userData,
    variables: userVariables,
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
              variables: userVariables,
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
                  userData?.user?.username || ""
                )
              : undefined
          }
        />
        <MainGrid
          title={
            <div>
              {userData?.user ? (
                <div
                  className="ml-2 flex flex-row items-center cursor-pointer group"
                  onClick={() => router.push(`/user/${userData.user?.uid}`)}
                >
                  <div className="mr-2.5">
                    <div className="relative">
                      <img
                        src={userData.user.profile?.avatarUrl}
                        className="w-7 h-7 rounded-35"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <div
                          className={`w-2 h-2 rounded-full ring-2 ring-primary-100 ${
                            userData.user.isOnline
                              ? "bg-green-500"
                              : "bg-yellow-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="text-md text-primary-500 font-semibold group-hover:underline">
                      {userData.user.uid}
                    </div>
                    <div className="text-xs leading-none">
                      {userData.user.isOnline
                        ? t("user.active_now")
                        : t("user.last_seen").replace(
                            "%time%",
                            dayjs(parseFloat(userData.user.lastSeen)).fromNow(
                              true
                            )
                          )}
                    </div>
                  </div>
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
          <ChatController chat={chatData?.chat.chat} />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const ChatPage = withMyApollo({ ssr: false })(Page);
