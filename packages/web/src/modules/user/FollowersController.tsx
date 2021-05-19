import { useMeQuery, useFollowersQuery } from "@ferman-pkgs/controller";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import processString from "react-process-string";

interface FollowersControllerProps {}

export const FollowersController: React.FC<FollowersControllerProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

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
    <div>
      {userLoading || meLoading || (!followersData && followersLoading) ? (
        <MySpinner />
      ) : !userData?.user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : !userData || !followersData || !meData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div>
          <div>
            <div>
              {followersData.followers?.count === 0 ? (
                <div className="text-red-500 text-base">
                  {processString([
                    {
                      regex: /%user%/,
                      fn: () => <b>{userData.user?.username}</b>,
                    },
                  ])(t("user.followers.no_users"))}
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
                      {t("common.load_more")}
                    </MyButton>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
