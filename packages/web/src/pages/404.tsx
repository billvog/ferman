import { Button } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../Components/ErrorText";
import { Layout } from "../Components/Layout";
import { withMyApollo } from "../Utils/withMyApollo";

const NotFoundPage = ({}) => {
  const router = useRouter();
  return (
    <Layout title="404 – Ferman">
      <Heading fontFamily="cursive" mb={4} color="brown">
        Error 404 – Page not found
      </Heading>
      <Text>
        The page you're trying to reach, doesn't exist. <br />
        You've been redirected somewhere safe.
      </Text>
      <Button mt={4} onClick={router.back} colorScheme="red">
        <ArrowBackIcon mr={2} /> Back
      </Button>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(NotFoundPage);
