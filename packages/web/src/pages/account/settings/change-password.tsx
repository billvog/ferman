import React from "react";
import { Layout } from "../../../Components/Layout";
import { withMyApollo } from "../../../Utils/withMyApollo";

const ChangePassword = ({}) => {
  return <Layout title="Change password – Ferman"></Layout>;
};

export default withMyApollo({ ssr: false })(ChangePassword);
