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
import { useFollowingUsersQuery, useMeQuery } from "../../../generated/graphql";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";

const UserFollowing = ({}) => {
  const router = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: userData, loading: userLoading } = useGetUserFromUrl();
  const {
    data: followingData,
    loading: followingLoading,
  } = useFollowingUsersQuery({
    skip: !userData?.user?.id,
    variables: {
      userId: userData?.user?.id || -1,
    },
  });

  return (
    <Layout
      title={`${
        userData?.user?.username + "'s Follows" || "Inspect Follows"
      } – Ferman`}
      size="md"
    >
      <Box>
        {userLoading || followingLoading || meLoading ? (
          <Spinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followingData || !meData ? (
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
                {userData.user.username}'s Follows
              </Heading>
            </Flex>
            <Box mt={4}>
              {userData.user.followingCount === 0 ? (
                <Text>
                  <chakra.b>{userData.user.username}</chakra.b> doesn't really
                  follow anybody.
                </Text>
              ) : (
                followingData.followingUsers?.map((follow) => (
                  <UserCard
                    key={follow.id}
                    me={meData.me || null}
                    user={follow}
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
})(UserFollowing);
