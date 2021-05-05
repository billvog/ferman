import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/UserCard";
import { useFollowingUsersQuery, useMeQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { MySpinner } from "../../../components/MySpinner";
import { MyButton } from "../../../components/MyButton";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";

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
      <div>
        {userLoading || followingLoading || meLoading ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followingData || !meData ? (
          <ErrorText>Internal server error, please try again later</ErrorText>
        ) : (
          <div>
            <div>
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
                    <b>{userData.user.username}'s</b> Follows
                  </h1>
                </div>
                {followingData.followingUsers?.length === 0 ? (
                  <div className="text-red-500 text-base">
                    There are no users followed by{" "}
                    <b>{userData.user.username}</b>
                  </div>
                ) : (
                  followingData.followingUsers?.map((follow) => (
                    <UserCard
                      key={follow.id}
                      me={meData.me || null}
                      user={follow}
                      marginBottom={10}
                      minimal
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(UserFollowing);
