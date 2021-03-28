import React from "react";
import { RegisterView } from "../views/RegisterView";
import { RegisterController } from "@ferman/controller";

interface RegisterConnectorProps {}

export const RegisterConnector: React.FC<RegisterConnectorProps> = ({}) => {
  return (
    <RegisterController>
      {(props) => <RegisterView {...props} />}
    </RegisterController>
  );
};
