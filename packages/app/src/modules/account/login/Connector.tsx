import React from "react";
import { LoginController } from "@ferman-pkgs/controller";
import { LoginView } from "./View";

export const LoginConnector: React.FC = ({}) => {
  return (
    <LoginController onFinish={() => {}}>
      {(props) => <LoginView {...props} />}
    </LoginController>
  );
};
