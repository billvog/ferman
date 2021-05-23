import { FullUserFragment, useFollowingsQuery } from "@ferman-pkgs/controller";
import React from "react";
import processString from "react-process-string";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";

interface FollowingsControllerProps extends PageWithAuthProps {
  user: FullUserFragment | null | undefined;
}

export const FollowingsController: React.FC<FollowingsControllerProps> = ({
  loggedUser,
  user,
}) => {
  const { t } = useTypeSafeTranslation();

  const {
    data: followingsData,
    loading: followingsLoading,
    fetchMore: fetchMoreFollowings,
    variables: followingsVariables,
  } = useFollowingsQuery({
    notifyOnNetworkStatusChange: true,
    skip: !user?.id,
    variables: {
      userId: user?.id || -1,
      limit: 15,
      skip: 0,
    },
  });

  return (
    <div>
      {typeof user === "undefined" ||
      (!followingsData && followingsLoading) ||
      typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : !followingsData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div>
          {followingsData.followings?.count === 0 ? (
            <div className="p-4 text-red-500 text-base">
              {processString([
                {
                  regex: /%user%/,
                  fn: () => <b>{user.username}</b>,
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
