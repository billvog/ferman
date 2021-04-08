import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Layout } from "../components/Layout";
import { MyButton } from "../components/MyButton";
import { withMyApollo } from "../utils/withMyApollo";

const NotFoundPage = ({}) => {
  const router = useRouter();
  return (
    <Layout title="404 – Ferman" size="sm">
      <h1>Page not found</h1>
      <MessageText>
        The page you're trying to reach, doesn't exist. <br />
        You've been redirected somewhere safe.
      </MessageText>
      <MyButton onClick={router.back}>
        <IoMdArrowBack />
        <span style={{ marginLeft: 6 }}>Back</span>
      </MyButton>
    </Layout>
  );
};

export default withMyApollo()(NotFoundPage);

// Styles
const MessageText = styled.div`
  color: grey;
  font-size: 10.5pt;
  font-weight: 500;
  margin-bottom: 10px;
`;
