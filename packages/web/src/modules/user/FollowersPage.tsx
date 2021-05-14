import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { useMeQuery, useFollowersQuery } from "@ferman-pkgs/controller";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { MySpinner } from "../../components/MySpinner";
import { MyButton } from "../../components/MyButton";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { WaitI18 } from "../../components/WaitI18";
import { HeaderController } from "../display/HeaderController";
import { AuthManager } from "../../components/AuthManager";
import { FollowersController } from "./FollowersController";
import { MainLayout } from "../../components/MainLayout";
import { CommonSidebar } from "../../components/CommonSidebar";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const FollowersPage = ({}) => {
  const { t } = useTypeSafeTranslation();
  const { data: userData, loading: userLoading } = useGetUserFromUrl();

  return (
    <WaitI18>
      <HeaderController
        title={
          userData?.user?.username
            ? t("user.followers.title").replace(
                "%user%",
                userData.user.username
              )
            : "Ferman"
        }
      />
      <AuthManager>
        {(user) => (
          <MainLayout
            title={
              userData?.user?.username
                ? t("user.followers.header_title")
                    .replace("%user%", userData.user.username)
                    .replace(
                      "%count%",
                      `${
                        userData.user.followersCount > 1
                          ? `(${userData.user.followersCount})`
                          : ""
                      }`
                    )
                : undefined
            }
            leftSidebar={<CommonSidebar loggedUser={user} />}
          >
            <FollowersController />
          </MainLayout>
        )}
      </AuthManager>
    </WaitI18>
  );
};
