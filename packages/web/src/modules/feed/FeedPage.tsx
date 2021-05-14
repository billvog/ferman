import React from "react";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import NextLink from "next/link";
import { Post } from "../../components/Post";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { BsSearch } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { WaitI18 } from "../../components/WaitI18";
import { HeaderController } from "../display/HeaderController";
import { AuthManager } from "../../components/AuthManager";
import { MainLayout } from "../../components/MainLayout";
import { FeedController } from "./FeedController";
import { CommonSidebar } from "../../components/CommonSidebar";

export const FeedPage = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <WaitI18>
      <HeaderController title={t("index.title")} />
      <AuthManager>
        {(user) => (
          <>
            <MainLayout leftSidebar={<CommonSidebar loggedUser={user} />}>
              <FeedController user={user} />
            </MainLayout>
          </>
        )}
      </AuthManager>
    </WaitI18>
  );
};
