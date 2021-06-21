import {
  FullUserFragment,
  OnMyUserUpdateDocument,
  OnMyUserUpdateSubscription,
  useMeQuery,
} from "@ferman-pkgs/controller";
import React, { useEffect } from "react";
import { MyCenterSpinner } from "../../components/MyCenterSpinner";
import { withMyApollo } from "../../utils/withMyApollo";

type User = FullUserFragment | null;

export const AuthContext = React.createContext<{
  me: User;
}>({
  me: null,
});

interface AuthProviderProps {}
const C: React.FC<AuthProviderProps> = ({ children }) => {
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
    return (
      <div className="w-screen h-screen">
        <MyCenterSpinner />
      </div>
    );
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

export const AuthProvider = withMyApollo({ ssr: false })(C);
