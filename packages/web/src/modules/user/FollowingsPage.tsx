import React from "react";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitAuth } from "../../components/WaitAuth";
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
      <WaitAuth>
        {(user) => (
          <>
            <MainGrid
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
              loggedUser={user}
              bottomNav={<CommonBottomNav loggedUser={user} />}
              leftSidebar={<CommonSidebar loggedUser={user} />}
            >
              <FollowingsController loggedUser={user} />
            </MainGrid>
          </>
        )}
      </WaitAuth>
    </WaitI18>
  );
};
