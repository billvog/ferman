import { FullUserFragment, useMeQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MySpinner } from "./MySpinner";

interface AuthManagerProps {
  RequireLoggedIn?: boolean;
  RequireNotLoggedIn?: boolean;
  children: (user: FullUserFragment | null) => JSX.Element;
}

export const AuthManager: React.FC<AuthManagerProps> = ({
  RequireLoggedIn = false,
  RequireNotLoggedIn = false,
  children,
}) => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (RequireLoggedIn || RequireNotLoggedIn) {
      setOk(false);
    } else {
      setOk(true);
    }
  }, []);

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

  return <>{ok ? children(data?.me || null) : <MySpinner />}</>;
};
