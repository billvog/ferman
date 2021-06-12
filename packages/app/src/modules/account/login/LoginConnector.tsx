import React from "react";
import { LoginController } from "@ferman-pkgs/controller";
import { LoginView } from "./LoginView";

export const LoginConnector: React.FC = ({}) => {
  return (
    <LoginController onFinish={() => {}}>
      {(props) => <LoginView {...props} />}
    </LoginController>
  );
};
