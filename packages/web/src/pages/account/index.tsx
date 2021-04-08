import { useApolloClient } from "@apollo/client";
import { Heading, Link, Text } from "@chakra-ui/layout";
import { Box, Button, Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { useLogoutMutation, useMeQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../utils/withMyApollo";
import NextLink from "next/link";
import { UserCard } from "../../components/UserCard";
import { ErrorText } from "../../components/ErrorText";
import moment from "moment";
import { MySpinner } from "../../components/MySpinner";
import styled from "styled-components";
import { MyButton } from "../../components/MyButton";

const MyAccount = () => {
  const toast = useToast();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    ssr: false,
  });

  const [logout] = useLogoutMutation();

  return (
    <Layout size="lg" title="My Account – Ferman" isAuth>
      <h1>My Account</h1>
      {meLoading ? (
        <MySpinner />
      ) : meError || !meData || !meData.me ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : (
        <div>
          <UserCard me={meData.me} user={meData.me} />
          <GravatarInfo>
            Ferman uses gravatar for avatars. Learn more about gravatar{" "}
            <a
              href="https://en.gravatar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
              style={{ color: "var(--blue)" }}
            >
              here
            </a>
            .
          </GravatarInfo>
          <MyButton onClick={() => router.push(`/user/${meData?.me?.uid}`)}>
            My Profile
          </MyButton>
          <MyButton
            style={{
              marginLeft: 6,
              backgroundColor: "burlywood",
            }}
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
          </MyButton>
          <Divider />
          <div>
            <PrivateInfoTitle>Private Information</PrivateInfoTitle>
            <PrivateInfoSubText>
              These information are not visible in the public.
            </PrivateInfoSubText>
            <PrivInfoContainer>
              <div>
                <b>Email:</b> {meData.me.email}
              </div>
              <div>
                <b>Date of birth:</b>{" "}
                {moment(parseFloat(meData.me.profile!.birthdate)).format(
                  "MMM Do YYYY"
                )}
              </div>
              <div>
                <b>Created date:</b>{" "}
                {moment(parseFloat(meData.me.createdAt)).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </div>
            </PrivInfoContainer>
          </div>
          <Divider />
          <div>
            <MyButton
              onClick={() => router.push("/account/delete")}
              style={{
                backgroundColor: "var(--red)",
              }}
            >
              Delete Account
            </MyButton>
            <DeleteAccountSubText>
              This will completely remove your account and anything that's
              associated with it (posts, comments, likes, follows, etc). Be
              careful with this, <b>any action cannot be undone</b>. Deleting
              your account requires your password.
            </DeleteAccountSubText>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(MyAccount);

// Styles
const GravatarInfo = styled.div`
  color: #a0a0a0;
  font-size: 9pt;
  font-family: inherit;
  font-weight: 600;
  margin: 8px 0 16px 0;
`;

const Divider = styled.div`
  border-top: 1px solid #f0f0f0;
  margin: 20px 5px 15px 5px;
`;

const PrivateInfoTitle = styled.h2`
  line-height: 1;
  margin-bottom: 0 !important;
`;

const PrivateInfoSubText = styled.div`
  color: grey;
  font-size: 9pt;
  margin-bottom: 6px;
`;

const PrivInfoContainer = styled.div`
  font-size: 10pt;
  color: dimgrey;
`;

const DeleteAccountSubText = styled.div`
  font-size: 9pt;
  color: grey;
  margin-top: 4px;
`;
