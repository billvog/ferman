import { FullUserFragment, useFollowersQuery } from "@ferman-pkgs/controller";
import React, { useContext } from "react";
import processString from "react-process-string";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../auth/AuthProvider";

interface FollowersControllerProps {
  user: FullUserFragment | null | undefined;
}

export const FollowersController: React.FC<FollowersControllerProps> = ({
  user,
}) => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);

  const {
    data: followersData,
    loading: followersLoading,
    fetchMore: fetchMoreFollowers,
    variables: followersVariables,
  } = useFollowersQuery({
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
      {typeof user === undefined ||
      (!followersData && followersLoading) ||
      typeof me === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : !followersData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div>
          {followersData.followers?.count === 0 ? (
            <div className="p-4 text-red-500 text-base">
              {processString([
                {
                  regex: /%user%/,
                  fn: () => <b>{user.username}</b>,
                },
              ])(t("user.followers.no_users"))}
            </div>
          ) : (
            <div className="divide-y border-b">
              {followersData.followers?.users.map((follower) => (
                <UserSummaryCard key={follower.id} me={me} user={follower} />
              ))}
            </div>
          )}
          {followersData?.followers?.users && followersData?.followers.hasMore && (
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
      )}
    </div>
  );
};
