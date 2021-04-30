import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/UserCard";
import { useFollowingUsersQuery, useMeQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { MySpinner } from "../../../components/MySpinner";
import styled from "styled-components";
import Link from "next/link";

const UserFollowing = ({}) => {
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
      <div>
        {userLoading || followingLoading || meLoading ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followingData || !meData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <div>
            <FollowsContainer>
              {userData.user.followingCount === 0 ? (
                <NoFollowsWrapper>
                  <b>{userData.user.username}</b> doesn't really follow
                  anybody...
                </NoFollowsWrapper>
              ) : (
                <div>
                  <TopSection>
                    <h2>{userData.user.username}'s Follows</h2>
                  </TopSection>
                  {followingData.followingUsers?.map((follow) => (
                    <UserCard
                      key={follow.id}
                      me={meData.me || null}
                      user={follow}
                      marginBottom={10}
                      minimal
                    />
                  ))}
                </div>
              )}
            </FollowsContainer>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(UserFollowing);

// Styles
const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NoFollowsWrapper = styled.div`
  text-align: center;
  font-family: inherit;
  font-size: 13pt;
  color: #929292;
`;

const FollowsContainer = styled.div``;
