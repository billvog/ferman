import { ResetPasswordController } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { ResetPasswordView } from "../../views/User/ResetPasswordView";

interface ResetPasswordConnectorProps {}
export const ResetPasswordConnector: React.FC<ResetPasswordConnectorProps> = ({}) => {
  const router = useRouter();
  const token = router.query.token as string;

  return (
    <ResetPasswordController token={token}>
      {(props) => <ResetPasswordView {...props} />}
    </ResetPasswordController>
  );
};
