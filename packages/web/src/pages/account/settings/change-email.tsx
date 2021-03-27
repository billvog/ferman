import React from "react";
import { Layout } from "../../../Components/Layout";
import { withMyApollo } from "../../../Utils/withMyApollo";

const ChangeEmail = ({}) => {
  return <Layout title="Change email – Ferman"></Layout>;
};

export default withMyApollo({ ssr: false })(ChangeEmail);
