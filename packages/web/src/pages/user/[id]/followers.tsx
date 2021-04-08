import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/UserCard";
import { useMeQuery, useUserFollowersQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { MySpinner } from "../../../components/MySpinner";
import styled from "styled-components";
import Link from "next/link";

const UserFollowers = ({}) => {
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
      <div>
        {userLoading || meLoading || followersLoading ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followersData || !meData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <div>
            <TopSection>
              <h2>
                <b>{userData.user.username}'s</b> Followers
              </h2>
            </TopSection>
            <FollowersContainer>
              {userData.user.followerCount === 0 ? (
                <NoFollowersWrapper>
                  <Link href={`/user/${userData.user.uid}`}>
                    <b className="link">{userData.user.username}</b>
                  </Link>{" "}
                  isn't really followed by anybody.
                </NoFollowersWrapper>
              ) : (
                followersData.userFollowers?.map((follower) => (
                  <UserCard
                    key={follower.id}
                    me={meData.me || null}
                    user={follower}
                    minimal
                  />
                ))
              )}
            </FollowersContainer>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(UserFollowers);

// Styles
const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NoFollowersWrapper = styled.div`
  text-align: center;
  background-color: #f8f8f8;
  padding: 14px 18px;
  color: brown;
  border-radius: 7px;
`;

const FollowersContainer = styled.div``;
