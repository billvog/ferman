import React from "react";
import { CommonBottomNav } from "../../components/CommonBottomNav";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainGrid } from "../../components/MainGrid";
import { WaitAuth } from "../../components/WaitAuth";
import { WaitI18 } from "../../components/WaitI18";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { withMyApollo } from "../../utils/withMyApollo";
import { HeaderController } from "../display/HeaderController";
import { FollowersController } from "./FollowersController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const { data: userData } = useGetUserFromUrl();

  return (
    <WaitI18>
      <HeaderController
        title={
          userData?.user?.username
            ? t("user.followers.title").replace(
                "%user%",
                `${userData.user.username} (@${userData.user.uid})`
              )
            : "Ferman"
        }
      />
      <WaitAuth>
        <MainGrid
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
          bottomNav={<CommonBottomNav />}
          leftSidebar={<CommonSidebar />}
        >
          <FollowersController user={userData?.user} />
        </MainGrid>
      </WaitAuth>
    </WaitI18>
  );
};

export const FollowersPage = withMyApollo({ ssr: false })(Page);
