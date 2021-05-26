import { FullUserFragment, useMeQuery } from "@ferman-pkgs/controller";
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
  const [ok, setOk] = useState(
    RequireLoggedIn || RequireNotLoggedIn ? false : true
  );

  const { data, loading } = useMeQuery({ ssr: false });
  const router = useRouter();

  useEffect(() => {
    if (ok) {
      return;
    }

    if (RequireLoggedIn) {
      if (!loading && !data?.me) {
        router.replace("/account/login?next=" + router.pathname);
      } else if (!loading && data?.me) {
        setOk(true);
      }
    }

    if (RequireNotLoggedIn) {
      if (!loading && data?.me) {
        router.replace("/");
      } else if (!loading && !data?.me) {
        setOk(true);
      }
    }
  }, [data, loading, router]);

  return (
    <div className="w-screen h-screen">
      {ok ? children(data?.me) : <MyCenterSpinner />}
    </div>
  );
};
