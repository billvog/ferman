import { useMeQuery, useFollowingsQuery } from "@ferman-pkgs/controller";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

interface FollowingsControllerProps {}
export const FollowingsController: React.FC<FollowingsControllerProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

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
    <div>
      {userLoading || (!followingsData && followingsLoading) || meLoading ? (
        <MySpinner />
      ) : !userData?.user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : !userData || !followingsData || !meData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div>
          <div>
            <div>
              {followingsData.followings?.count === 0 ? (
                <div className="text-red-500 text-base">
                  {t("user.followings.no_users").replace(
                    "%user%",
                    userData.user.username
                  )}
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
