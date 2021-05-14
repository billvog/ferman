import React from "react";
import { AuthManager } from "../../components/AuthManager";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainLayout } from "../../components/MainLayout";
import { WaitI18 } from "../../components/WaitI18";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { FollowingsController } from "./FollowingsController";

export const FollowingsPage = ({}) => {
  const { t } = useTypeSafeTranslation();
  const { data: userData } = useGetUserFromUrl();

  return (
    <WaitI18>
      <HeaderController
        title={
          userData?.user?.username
            ? t("user.followings.title").replace(
                "%user%",
                userData.user.username
              )
            : "Ferman"
        }
      />
      <AuthManager>
        {(user) => (
          <>
            <MainLayout
              title={
                userData?.user?.username
                  ? t("user.followings.header_title")
                      .replace("%user%", userData.user.username)
                      .replace(
                        "%count%",
                        `${
                          userData.user.followingsCount > 1
                            ? `(${userData.user.followingsCount})`
                            : ""
                        }`
                      )
                  : undefined
              }
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <FollowingsController />
            </MainLayout>
          </>
        )}
      </AuthManager>
    </WaitI18>
  );
};
