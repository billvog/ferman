import React from "react";
import { FullUserFragment, useMeQuery } from "@ferman-pkgs/controller";
import { View } from "react-native";

type User = FullUserFragment;

export const AuthContext = React.createContext<{
  me: User;
}>({
  me: null,
});

interface AuthProviderProps {}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <View />;
  }

  return (
    <AuthContext.Provider
      value={{
        me: data.me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
