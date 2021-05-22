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
import { UserOpenGraphPreview } from "./UserOpenGraphPreview";
import { UserProfileController } from "./UserProfileController";

const Page: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  const { data: userData } = useGetUserFromUrl();

  return (
    <UserOpenGraphPreview user={userData?.user}>
      <WaitI18>
        <HeaderController
          title={
            userData?.user
              ? t("user.title").replace("%user%", userData?.user.username)
              : undefined
          }
        />
        <WaitAuth>
          {(user) => (
            <>
              <MainGrid
                title={userData?.user?.username}
                loggedUser={user}
                bottomNav={<CommonBottomNav loggedUser={user} />}
                leftSidebar={<CommonSidebar loggedUser={user} />}
              >
                <UserProfileController loggedUser={user} />
              </MainGrid>
            </>
          )}
        </WaitAuth>
      </WaitI18>
    </UserOpenGraphPreview>
  );
};

export const UserPage = withMyApollo({
  ssr: true,
})(Page);
