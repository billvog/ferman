import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { useFollowingsQuery, useMeQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { MySpinner } from "../../components/MySpinner";
import { MyButton } from "../../components/MyButton";
import { UserSummaryCard } from "../../components/UserSummaryCard";

export const FollowingsPage = ({}) => {
  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });
  const { data: userData, loading: userLoading } = useGetUserFromUrl();
  const {
    data: followingsData,
    loading: followingsLoading,
    fetchMore: fetchMoreFollowings,
    variables: followingsVariables,
  } = useFollowingsQuery({
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
          ? `People ${userData?.user?.username} follows on Ferman`
          : "Ferman"
      }
      pageTitle={
        userData?.user?.username
          ? `${userData.user.username}'s followings ${
              followingsData?.followings
                ? `(${followingsData?.followings?.count})`
                : ""
            }`
          : ""
      }
    >
      <div>
        {userLoading || (!followingsData && followingsLoading) || meLoading ? (
          <MySpinner />
        ) : !userData?.user ? (
          <ErrorText>User not found (404)</ErrorText>
        ) : !userData || !followingsData || !meData ? (
          <ErrorText>Internal server error, please try again later</ErrorText>
        ) : (
          <div>
            <div>
              <div>
                {followingsData.followings?.count === 0 ? (
                  <div className="text-red-500 text-base">
                    There are no users followed by{" "}
                    <b>{userData.user.username}</b>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {followingsData.followings?.users.map((follow) => (
                      <UserSummaryCard
                        key={follow.id}
                        me={meData.me || null}
                        user={follow}
                      />
                    ))}
                  </div>
                )}
                {followingsData?.followings?.users &&
                  followingsData?.followings.hasMore && (
                    <div className="flex justify-center mt-5">
                      <MyButton
                        isLoading={followingsLoading}
                        onClick={() => {
                          fetchMoreFollowings!({
                            variables: {
                              ...followingsVariables,
                              skip: followingsData.followings?.users.length,
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
