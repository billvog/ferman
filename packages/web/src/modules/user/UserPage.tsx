import React from "react";
import { WaitAuth } from "../../components/WaitAuth";
import { CommonSidebar } from "../../components/CommonSidebar";
import { MainLayout } from "../../components/MainLayout";
import { WaitI18 } from "../../components/WaitI18";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { HeaderController } from "../display/HeaderController";
import { UserOpenGraphPreview } from "./UserOpenGraphPreview";
import { UserProfileController } from "./UserProfileController";

export const UserPage: React.FC = () => {
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
              <MainLayout
                title={userData?.user?.username}
                leftSidebar={<CommonSidebar loggedUser={user} />}
              >
                <UserProfileController />
              </MainLayout>
            </>
          )}
        </WaitAuth>
      </WaitI18>
    </UserOpenGraphPreview>
  );
};
