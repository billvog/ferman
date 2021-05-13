import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { useMeQuery, useFollowersQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { MySpinner } from "../../components/MySpinner";
import { MyButton } from "../../components/MyButton";
import { UserSummaryCard } from "../../components/UserSummaryCard";

export const FollowersPage = ({}) => {
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
      pageTitle={
        userData?.user?.username
          ? `${userData.user.username}'s followers ${
              followersData?.followers
                ? `(${followersData?.followers?.count})`
                : ""
            }`
          : ""
      }
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
