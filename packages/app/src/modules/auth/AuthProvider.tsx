import React from "react";
import { FullUserFragment, useMeQuery } from "@ferman-pkgs/controller";
import { CenterSpinner } from "../../components/CenterSpinner";

type User = FullUserFragment | null;

export const AuthContext = React.createContext<{
  me: User;
}>({
  me: null,
});

interface AuthProviderProps {}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, loading } = useMeQuery();

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
