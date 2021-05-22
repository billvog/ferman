import { usePostsQuery } from "@ferman-pkgs/controller";
import React, { useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useGetUserFromUrl } from "../../shared-hooks/useGetUserFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";

type TabState = 0 | 1;
interface TabItemProps {
  text: string | JSX.Element;
  isCurrent: boolean;
  onClick: () => any;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  return (
    <div
      className="relative w-full flex-1 text-center text-md fullscreen:text-lg text-primary-600 transition-colors cursor-pointer hover:bg-primary-50"
      onClick={props.onClick}
    >
      <div className="p-3">{props.text}</div>
      {props.isCurrent && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bottom-1 rounded-full bg-primary-500"
          style={{
            width: "25%",
            height: "3px",
          }}
        />
      )}
    </div>
  );
};

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

  const [tabState, setTabState] = useState<TabState>(0);

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
        <div className="relative flex flex-col">
          <div className="w-full">
            <div>
              <UserCard user={userData.user} me={loggedUser} />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center items-center">
              <TabItem
                text={
                  <span>
                    <b>{t("user.posts")}</b>{" "}
                    {postsData.posts.count > 1 && `(${postsData.posts.count})`}
                  </span>
                }
                isCurrent={tabState === 0}
                onClick={() => setTabState(0)}
              />
              <TabItem
                text={<b>{t("user.comments")}</b>}
                isCurrent={tabState === 1}
                onClick={() => setTabState(1)}
              />
            </div>
            <div className="divide-y border-t border-b">
              {tabState === 0
                ? postsData.posts.posts.map((post) => (
                    <Post key={post.id} post={post} me={loggedUser} />
                  ))
                : "TODO: add comments made by user..."}
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
