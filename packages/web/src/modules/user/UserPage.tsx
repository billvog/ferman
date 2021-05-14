import React from "react";
import { AuthManager } from "../../components/AuthManager";
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
              ? t("user.title").replace("$1", userData?.user.username)
              : undefined
          }
        />
        <AuthManager>
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
        </AuthManager>
      </WaitI18>
    </UserOpenGraphPreview>
  );
};
