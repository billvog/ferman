import React from "react";
import { Layout } from "../../../components/Layout";
import { withMyApollo } from "../../../utils/withMyApollo";

const ChangePassword = ({}) => {
  return <Layout title="Change password – Ferman"></Layout>;
};

export default withMyApollo({ ssr: false })(ChangePassword);
