import React from "react";
import {
  FullUserFragment,
  OnMyUserUpdateDocument,
  OnMyUserUpdateSubscription,
  useMeQuery,
} from "@ferman-pkgs/controller";
import { CenterSpinner } from "../../components/CenterSpinner";
import { useEffect } from "react";

type User = FullUserFragment | null;

export const AuthContext = React.createContext<{
  me: User;
}>({
  me: null,
});

interface AuthProviderProps {}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, loading, subscribeToMore } = useMeQuery();

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
