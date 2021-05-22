import { usePostsQuery } from "@ferman-pkgs/controller";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";

interface UserProfileControllerProps extends PageWithAuthProps {}

export const UserProfileController: React.FC<UserProfileControllerProps> = ({
  loggedUser,
}) => {
  const { t } = useTypeSafeTranslation();

  const { data: userData, loading: userLoading } = useGetUserFromUrl();
  const {
    data: postsData,
    loading: postsLoading,
    fetchMore: fetchMorePosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: !userData?.user?.id,
    variables: {
      limit: 15,
      skip: null,
      userId: userData?.user?.id,
    },
  });

  return (
    <div>
      {userLoading ||
      (postsLoading && !postsData) ||
      typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !userData?.user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : !userData || !postsData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="relative flex flex-col space-y-4">
          <div className="w-full">
            <div>
              <UserCard user={userData.user} me={loggedUser} />
            </div>
          </div>
          <div className="w-full">
            <div className="space-y-2">
              {postsData.posts.posts.map((post) => (
                <Post key={post.id} post={post} me={loggedUser} />
              ))}
            </div>
          </div>
        </div>
      )}
      {postsData?.posts.posts && postsData?.posts?.hasMore && (
        <div className="flex justify-center mt-5">
          <MyButton
            isLoading={postsLoading}
            onClick={() => {
              fetchMorePosts!({
                variables: {
                  ...postsVariables,
                  skip: postsData.posts.posts.length,
                },
              });
            }}
          >
            {t("common.load_more")}
          </MyButton>
        </div>
      )}
    </div>
  );
};
