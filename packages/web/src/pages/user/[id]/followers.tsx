import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/UserCard";
import { useMeQuery, useUserFollowersQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { MySpinner } from "../../../components/MySpinner";
import { MyButton } from "../../../components/MyButton";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";

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
      <div>
        {userLoading || meLoading || followersLoading ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followersData || !meData ? (
          <ErrorText>Internal server error (500)</ErrorText>
        ) : (
          <div>
            <div>
              {userData.user.followerCount === 0 ? (
                <div className="text-center text-red-500 text-base">
                  <b>{userData.user.username}</b> isn't really followed by
                  anybody...
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-start mt-2.5 mb-2">
                    <MyButton
                      color="transparent"
                      square
                      onClick={() => router.back()}
                    >
                      <MdArrowBack />
                    </MyButton>
                    <h1 className="text-xl">
                      <b>{userData.user.username}'s</b> Followers
                    </h1>
                  </div>
                  {followersData.userFollowers?.map((follower) => (
                    <UserCard
                      key={follower.id}
                      me={meData.me || null}
                      user={follower}
                      minimal
                      marginBottom={10}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(UserFollowers);
