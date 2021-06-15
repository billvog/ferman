import { FullUserFragment, usePostsLazyQuery } from "@ferman-pkgs/controller";
import { Router } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { UserCard } from "../../components/UserCard";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../auth/AuthProvider";
import { TabItem, TabState } from "./UserProfileTabs";

const ItemsPerTabLimit = 15;

interface UserProfileControllerProps {
  user: FullUserFragment | null | undefined;
}

export const UserProfileController: React.FC<UserProfileControllerProps> = ({
  user,
}) => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);

  const [
    runPostsQuery,
    {
      called: postsQueryCalled,
      data: postsData,
      loading: postsLoading,
      fetchMore: fetchMorePosts,
      variables: postsVariables,
    },
  ] = usePostsLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: ItemsPerTabLimit,
      skip: 0,
      userId: user?.id,
      isReply: false,
    },
  });

  const [tabState, setTabState] = useState<TabState>(0);

  // reset tab when changing route
  Router.events.on("routeChangeComplete", (url) => {
    setTabState(0);
  });

  useEffect(() => {
    if (tabState === 0) {
      runPostsQuery();
    } else if (tabState === 1) {
      runPostsQuery({
        variables: {
          limit: ItemsPerTabLimit,
          skip: 0,
          userId: user?.id,
          isReply: true,
        },
      });
    } else if (tabState === 2) {
      runPostsQuery({
        variables: {
          limit: ItemsPerTabLimit,
          skip: 0,
          likedBy: user?.id,
          userId: null,
          isReply: null,
        },
      });
    }
  }, [tabState]);

  return (
    <div>
      {typeof user === "undefined" || typeof me === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : (
        <div className="relative flex flex-col">
          <div className="w-full">
            <UserCard user={user} me={me} />
          </div>
          <div className="w-full">
            <div className="flex w-screen fullscreen:w-auto overflow-x-auto overflow-y-hidden">
              {!user.profile ? (
                <div className="p-2">
                  <MySpinner />
                </div>
              ) : (
                <>
                  <TabItem
                    text={
                      <>
                        <b>{t("user.posts")}</b>{" "}
                        {user.profile.postsCount > 0 && (
                          <span>{`(${user.profile.postsCount})`}</span>
                        )}
                      </>
                    }
                    isCurrent={tabState === 0}
                    onClick={() => setTabState(0)}
                  />
                  <TabItem
                    text={
                      <>
                        <b>{t("user.replies")}</b>
                        {user.profile.repliesCount > 0 && (
                          <span>{`(${user.profile.repliesCount})`}</span>
                        )}
                      </>
                    }
                    isCurrent={tabState === 1}
                    onClick={() => setTabState(1)}
                  />
                  <TabItem
                    text={
                      <>
                        <b>{t("user.liked_posts")}</b>
                        {user.profile.likesCount > 0 && (
                          <span>{`(${user.profile.likesCount})`}</span>
                        )}
                      </>
                    }
                    isCurrent={tabState === 2}
                    onClick={() => setTabState(2)}
                  />
                </>
              )}
            </div>
            <div>
              {tabState === 0 || tabState === 1 || tabState === 2 ? (
                <div>
                  {(postsLoading && !postsData) || !postsQueryCalled ? (
                    <div className="p-4">
                      <MySpinner />
                    </div>
                  ) : !postsData ? (
                    <ErrorText>{t("errors.500")}</ErrorText>
                  ) : (
                    <>
                      {postsData.posts.count === 0 ? (
                        <div className="p-6 text-base text-center text-red-500 font-semibold">
                          {t(
                            tabState === 0
                              ? "user.no_posts"
                              : tabState === 1
                              ? "user.no_replies"
                              : "user.no_liked_posts"
                          ).replace("%user%", user.username)}
                        </div>
                      ) : (
                        <div className="divide-y border-b">
                          {postsData.posts.posts.map((post) => (
                            <Post key={post.id} post={post} me={me} />
                          ))}
                        </div>
                      )}
                      {postsData.posts.hasMore && (
                        <div className="flex justify-center p-5">
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
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
