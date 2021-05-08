import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { MyButton } from "../components/MyButton";
import { withMyApollo } from "../utils/withMyApollo";

const NotFoundPage = ({}) => {
  const router = useRouter();
  return (
    <Layout title="403 – Ferman" size="sm">
      <h1 className="heading">Access Denied</h1>
      <div className="text-primary-450 text-sm font-semibold mb-3">
        You are not allowed to access this content. <br />
        You've been redirected somewhere safe.
      </div>
      <MyButton onClick={router.back} color="secondary">
        <IoMdArrowBack />
        <span className="ml-1.5">Back</span>
      </MyButton>
    </Layout>
  );
};

export default withMyApollo()(NotFoundPage);
