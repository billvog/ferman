import { LoginController } from "@ferman/controller";
import React from "react";
import { LoginView } from "../views/LoginView";

interface LoginConnectorProps {}
export const LoginConnector: React.FC<LoginConnectorProps> = ({}) => {
  return (
    <LoginController>{(props) => <LoginView {...props} />}</LoginController>
  );
};
