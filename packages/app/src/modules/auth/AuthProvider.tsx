import React from "react";
import {
  FullUserFragment,
  MeQuery,
  OnMyUserUpdateDocument,
  OnMyUserUpdateSubscription,
  useMeQuery,
  useUpdatePushTokenMutation,
} from "@ferman-pkgs/controller";
import { CenterSpinner } from "../../components/CenterSpinner";
import { useEffect } from "react";
import { RegisterForPushNotifications } from "../../utils/RegisterForPushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gql } from "@apollo/client";
const key = "@ferman/notification-asked";

type User = FullUserFragment | null;

export const AuthContext = React.createContext<{
  me: User;
}>({
  me: null,
});

interface AuthProviderProps {}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, loading, subscribeToMore, client } = useMeQuery();
  const [updatePushToken] = useUpdatePushTokenMutation();

  // subscribe for realtime changes
  useEffect(() => {
    if (!data?.me) return;

    const unsubscribe = subscribeToMore<OnMyUserUpdateSubscription>({
      document: OnMyUserUpdateDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        else
          return {
            me: subscriptionData.data.onMyUserUpdate,
          };
      },
    });

    // request push token
    AsyncStorage.getItem(key).then((x) => {
      if (x) return;
      RegisterForPushNotifications().then(async (pushToken) => {
        AsyncStorage.setItem(key, "true");
        if (!pushToken) {
          return;
        }

        const { data: mutationData } = await updatePushToken({
          variables: { pushToken },
        });

        if (mutationData?.updatePushToken) {
          client.writeFragment({
            id: "User:" + data.me?.id,
            fragment: gql`
              fragment _ on User {
                hasPushToken
              }
            `,
            data: {
              hasPushToken: true,
            },
          });
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [data?.me]);

  if (loading) {
    return <CenterSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        me: data?.me || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
