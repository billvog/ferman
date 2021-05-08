import React from "react";
import { DeleteUserController } from "@ferman-pkgs/controller";
import { AccDelView } from "../../views/User/AccDelView";
import { useApolloClient } from "@apollo/client";

interface AccDelConnectorProps {}
export const AccDelConnector: React.FC<AccDelConnectorProps> = ({}) => {
  const apolloClient = useApolloClient();

  const finished = () => {
    apolloClient.resetStore();
  };

  return (
    <DeleteUserController onFinish={finished}>
      {(props) => <AccDelView {...props} />}
    </DeleteUserController>
  );
};
