import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, Text } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { Layout } from "../../../components/Layout";
import { useMeQuery } from "../../../generated/graphql";
import { withMyApollo } from "../../../utils/withMyApollo";
import NextLink from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Settings = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  return (
    <Layout size="lg" title="Account Settings – Ferman" isAuth>
      {meLoading ? (
        <Spinner />
      ) : (
        <Box>
          <Heading color="mainDarkBlue" fontFamily="cursive">
            Settings
          </Heading>
          <Box mt={4} p={4} borderWidth={1} borderRadius="md">
            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input value={meData?.me?.uid} disabled />
              <FormHelperText fontSize={12}>
                Every UID must be strictly unique. Thus, it cannot change.
              </FormHelperText>
            </FormControl>
          </Box>
          <Box mt={4} p={4} borderWidth={1} borderRadius="md">
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input value={meData?.me?.email} variant="filled" disabled />
              <FormHelperText fontSize={12}>
                Also used for gravatar. Learn more about gravatar{" "}
                <Link color="cornflowerblue">
                  <a
                    href="https://en.gravatar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </Link>
                .
              </FormHelperText>
            </FormControl>
            <NextLink href="/account/settings/change-email">
              <Button as={Link} colorScheme="teal" size="sm">
                change
                <ArrowForwardIcon ml={1} />
              </Button>
            </NextLink>
          </Box>
          <Box mt={4} p={4} borderWidth={1} borderRadius="md">
            <FormLabel>Password</FormLabel>
            <Input
              value="test-password"
              variant="filled"
              mb={2}
              type="password"
              disabled
            />
            <NextLink href="/account/settings/change-password">
              <Button as={Link} colorScheme="blue" size="sm">
                change
                <ArrowForwardIcon ml={1} />
              </Button>
            </NextLink>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(Settings);
