import React from "react";
import { RegisterConnector } from "../../Connectors/RegisterConnector";
import { withMyApollo } from "../../Utils/withMyApollo";

export const Register = ({}) => {
  return <RegisterConnector />;
};

export default withMyApollo({
  ssr: false,
})(Register);
