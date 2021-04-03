import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/UserCard";
import { useMeQuery, useUserFollowersQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";

const UserFollowers = ({}) => {
  const router = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: userData, loading: userLoading } = useGetUserFromUrl();
  const {
    data: followersData,
    loading: followersLoading,
  } = useUserFollowersQuery({
    skip: !userData?.user?.id,
    variables: {
      userId: userData?.user?.id || -1,
    },
  });

  return (
    <Layout
      title={`${
        userData?.user?.username + "'s Followers" || "Inspect Followers"
      } – Ferman`}
      size="md"
    >
      <Box>
        {userLoading || meLoading || followersLoading ? (
          <Spinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followersData || !meData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <Box>
            <Flex mb={4} align="center">
              <IconButton
                aria-label="go back"
                icon={<ArrowBackIcon />}
                onClick={() => router.back()}
                size="sm"
              />
              <Heading ml={4} fontSize={24} color="mainDarkBlue">
                {userData.user.username}'s Followers
              </Heading>
            </Flex>
            <Box mt={4}>
              {userData.user.followerCount === 0 ? (
                <Text>
                  <chakra.b>{userData.user.username}</chakra.b> isn't really
                  followed by anybody.
                </Text>
              ) : (
                followersData.userFollowers?.map((follower) => (
                  <UserCard
                    key={follower.id}
                    me={meData.me || null}
                    user={follower}
                  />
                ))
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(UserFollowers);
