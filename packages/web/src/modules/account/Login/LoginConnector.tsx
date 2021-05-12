import { LoginController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { LoginView } from "./LoginView";

interface LoginConnectorProps {}
export const LoginConnector: React.FC<LoginConnectorProps> = ({}) => {
  const router = useRouter();

  const finished = () => {
    router.push("/");
  };

  return (
    <LoginController onFinish={finished}>
      {(props) => <LoginView {...props} />}
    </LoginController>
  );
};
