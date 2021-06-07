import {
  FullUserFragment,
  OnUserUpdateDocument,
  OnUserUpdateSubscription,
  useMeQuery,
} from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MyCenterSpinner } from "./MyCenterSpinner";

interface WaitAuthProps {
  RequireLoggedIn?: boolean;
  RequireNotLoggedIn?: boolean;
  children: (user: FullUserFragment | null | undefined) => JSX.Element;
}

export const WaitAuth: React.FC<WaitAuthProps> = ({
  RequireLoggedIn = false,
  RequireNotLoggedIn = false,
  children,
}) => {
  const router = useRouter();

  const [ok, setOk] = useState(
    RequireLoggedIn || RequireNotLoggedIn ? false : true
  );

  const {
    data: userData,
    loading,
    subscribeToMore,
  } = useMeQuery({ ssr: false });

  useEffect(() => {
    const unsubscribe = subscribeToMore<OnUserUpdateSubscription>({
      document: OnUserUpdateDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        else
          return {
            me: subscriptionData.data.onUserUpdate,
          };
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (ok) {
      return;
    }

    if (RequireLoggedIn) {
      if (!loading && !userData?.me) {
        router.replace("/account/login?next=" + router.asPath);
      } else if (!loading && userData?.me) {
        setOk(true);
      }
    }

    if (RequireNotLoggedIn) {
      if (!loading && userData?.me) {
        router.replace("/");
      } else if (!loading && !userData?.me) {
        setOk(true);
      }
    }
  }, [userData, loading, router]);

  return (
    <div className="w-screen h-screen">
      {ok ? children(userData?.me) : <MyCenterSpinner />}
    </div>
  );
};
