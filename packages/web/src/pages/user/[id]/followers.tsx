import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { Layout } from "../../../components/Layout";
import { UserCard } from "../../../components/UserCard";
import { useMeQuery, useFollowersQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../../utils/useGetUserFromUrl";
import { withMyApollo } from "../../../utils/withMyApollo";
import { MySpinner } from "../../../components/MySpinner";
import { MyButton } from "../../../components/MyButton";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import { UserSummaryCard } from "../../../components/UserSummaryCard";

const UserFollowers = ({}) => {
  const router = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: userData, loading: userLoading } = useGetUserFromUrl();
  const {
    data: followersData,
    loading: followersLoading,
    fetchMore: fetchMoreFollowers,
    variables: followersVariables,
  } = useFollowersQuery({
    notifyOnNetworkStatusChange: true,
    skip: !userData?.user?.id,
    variables: {
      userId: userData?.user?.id || -1,
      limit: 15,
      skip: 0,
    },
  });

  return (
    <Layout
      title={
        userData?.user?.username
          ? `People that follow ${userData?.user?.username} on Ferman`
          : "Ferman"
      }
      size="md"
    >
      <div>
        {userLoading || meLoading || (!followersData && followersLoading) ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followersData || !meData ? (
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
                  <h1 className="text-xl text-primary-600">
                    <b>{userData.user.username}'s</b> Followers{" "}
                    {followersData.followers &&
                      followersData.followers.count > 1 && (
                        <span>({followersData.followers.count})</span>
                      )}
                  </h1>
                </div>
                {followersData.followers?.count === 0 ? (
                  <div className="text-red-500 text-base">
                    There are no users following <b>{userData.user.username}</b>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {followersData.followers?.users.map((follower) => (
                      <UserSummaryCard
                        key={follower.id}
                        me={meData.me || null}
                        user={follower}
                      />
                    ))}
                  </div>
                )}
                {followersData?.followers?.users &&
                  followersData?.followers.hasMore && (
                    <div className="flex justify-center mt-5">
                      <MyButton
                        isLoading={followersLoading}
                        onClick={() => {
                          fetchMoreFollowers!({
                            variables: {
                              ...followersVariables,
                              skip: followersData.followers?.users.length,
                            },
                          });
                        }}
                      >
                        load more
                      </MyButton>
                    </div>
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
})(UserFollowers);
