import { ForgotPasswordController } from "@ferman-pkgs/controller";
import React from "react";
import { ForgotPasswordView } from "./ForgotPasswordView";

interface ForgotPasswordConnectorProps {}
export const ForgotPasswordConnector: React.FC<ForgotPasswordConnectorProps> = ({}) => {
  return (
    <ForgotPasswordController>
      {(props) => <ForgotPasswordView {...props} />}
    </ForgotPasswordController>
  );
};
