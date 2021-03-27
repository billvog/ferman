import { useApolloClient } from "@apollo/client";
import { Divider, Heading, Link, Text } from "@chakra-ui/layout";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../Components/Layout";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { withMyApollo } from "../../Utils/withMyApollo";
import NextLink from "next/link";
import { UserCard } from "../../Components/UserCard";
import { ErrorText } from "../../Components/ErrorText";
import moment from "moment";
import { SettingsIcon } from "@chakra-ui/icons";

interface MyAccountProps {}

const MyAccount: React.FC<MyAccountProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    ssr: false,
  });

  const [logout] = useLogoutMutation();

  return (
    <Layout size="lg" title="My Account – Ferman" isAuth>
      <Heading mb={4} color="mainDarkBlue" fontFamily="cursive">
        My Account
      </Heading>
      {meLoading ? (
        <Spinner />
      ) : meError || !meData || !meData.me ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : (
        <Box>
          <UserCard me={meData.me} user={meData.me} />
          <Text fontSize={12} color="grey" mb={4}>
            Ferman uses gravatar for avatars. Learn more about gravatar{" "}
            <Link color="cornflowerblue" fontWeight="600">
              <a
                href="https://en.gravatar.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </Link>
          </Text>
          <NextLink href={`/account/settings`}>
            <Button colorScheme="telegram" fontWeight="600" size="sm">
              <SettingsIcon mr={2} />
              Settings
            </Button>
          </NextLink>
          <NextLink href={`/user/${meData.me.uid}`}>
            <Button
              ml={2}
              colorScheme=""
              bg="lightseagreen"
              fontWeight="600"
              size="sm"
            >
              My Profile
            </Button>
          </NextLink>
          <Button
            ml={2}
            colorScheme="red"
            size="sm"
            onClick={async () => {
              const reponse = await logout();
              if (!reponse.data?.logout) {
                return toast({
                  title: "Logout failed",
                  description: "Internal server error (500)",
                  status: "error",
                  duration: 5000,
                });
              }

              await apolloClient.resetStore();
              router.replace("/"); // redirect
            }}
          >
            Sign out
          </Button>
          <Divider my={4} />
          <Box>
            <Heading fontSize={20} color="mainDarkBlue">
              Private Information
            </Heading>
            <Text fontSize={12} color="grey" mb={2}>
              This data are not visible in the public.
            </Text>
            <Text>Email: {meData.me.email}</Text>
            <Text>
              Date of birth:{" "}
              {moment(parseFloat(meData.me.profile!.birthdate)).format(
                "MMM Do YYYY"
              )}
            </Text>
            <Text>
              Created date:{" "}
              {moment(parseFloat(meData.me.createdAt)).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
          </Box>
          <Divider my={4} />
          <Box>
            <NextLink href="/account/delete">
              <Button colorScheme="red">Delete Account</Button>
            </NextLink>
            <Text fontSize={12} color="grey" mt={2}>
              This will completely remove your account and anything that's
              associated with it (posts, comments, likes, follows, etc). Be
              careful with this, any action cannot be undone. Deleting your
              account requires your password.
            </Text>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(MyAccount);
