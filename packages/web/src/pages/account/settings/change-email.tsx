import React from "react";
import { Layout } from "../../../components/Layout";
import { withMyApollo } from "../../../utils/withMyApollo";

const ChangeEmail = ({}) => {
  return <Layout title="Change email – Ferman"></Layout>;
};

export default withMyApollo({ ssr: false })(ChangeEmail);
