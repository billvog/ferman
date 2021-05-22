import { useFollowingsQuery } from "@ferman-pkgs/controller";
import React from "react";
import processString from "react-process-string";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";

interface FollowingsControllerProps extends PageWithAuthProps {}

export const FollowingsController: React.FC<FollowingsControllerProps> = ({
  loggedUser,
}) => {
  const { t } = useTypeSafeTranslation();

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
      {userLoading ||
      (!followingsData && followingsLoading) ||
      typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !userData?.user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : !userData || !followingsData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div>
          {followingsData.followings?.count === 0 ? (
            <div className="text-red-500 text-base">
              {processString([
                {
                  regex: /%user%/,
                  fn: () => <b>{userData.user?.username}</b>,
                },
              ])(t("user.followings.no_users"))}
            </div>
          ) : (
            <div className="divide-y border-b">
              {followingsData.followings?.users.map((follow) => (
                <UserSummaryCard
                  key={follow.id}
                  me={loggedUser}
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
      )}
    </div>
  );
};
