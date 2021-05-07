import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components/Layout";
import { MyButton } from "../components/MyButton";
import { withMyApollo } from "../utils/withMyApollo";

const NotFoundPage = ({}) => {
  const router = useRouter();
  return (
    <Layout title="404 – Ferman" size="sm">
      <h1 className="heading">Page not found</h1>
      <div className="text-secondary-500 text-sm font-semibold mb-3">
        The page you're trying to reach, doesn't exist. <br />
        You've been redirected somewhere safe.
      </div>
      <MyButton onClick={router.back}>
        <IoMdArrowBack />
        <span className="ml-1.5">Back</span>
      </MyButton>
    </Layout>
  );
};

export default withMyApollo()(NotFoundPage);
