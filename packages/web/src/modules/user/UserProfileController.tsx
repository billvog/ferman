import {
  FullUserFragment,
  useCommentsLazyQuery,
  usePostsLazyQuery,
} from "@ferman-pkgs/controller";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { PostComment } from "../../components/PostComment";
import { UserCard } from "../../components/UserCard";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PageWithAuthProps } from "../../types/PageWithAuthProps";

type TabState = 0 | 1 | 2;
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

interface UserProfileControllerProps extends PageWithAuthProps {
  user: FullUserFragment | null | undefined;
}

export const UserProfileController: React.FC<UserProfileControllerProps> = ({
  loggedUser,
  user,
}) => {
  const { t } = useTypeSafeTranslation();

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
      limit: 15,
      skip: null,
      userId: user?.id,
    },
  });

  const [
    runCommentsQuery,
    {
      called: commentsQueryCalled,
      data: commentsData,
      loading: commentsLoading,
      fetchMore: fetchMoreComments,
      variables: commentsVariables,
    },
  ] = useCommentsLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      userId: user?.id,
    },
  });

  const [tabState, setTabState] = useState<TabState>(0);
  useEffect(() => setTabState(0), []);

  useEffect(() => {
    if (tabState === 0) {
      runPostsQuery();
    } else if (tabState === 1) {
      runCommentsQuery();
    } else if (tabState === 2) {
      runPostsQuery({
        variables: {
          limit: postsVariables!.limit,
          likedBy: user?.id || -1,
          userId: null,
        },
      });
    }
  }, [tabState]);

  return (
    <div>
      {typeof user === "undefined" || typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : (
        <div className="relative flex flex-col">
          <div className="w-full">
            <UserCard user={user} me={loggedUser} />
          </div>
          <div className="w-full">
            <div className="flex justify-center items-center">
              {!user.profile ? (
                <div className="p-2">
                  <MySpinner />
                </div>
              ) : (
                <>
                  <TabItem
                    text={
                      <span>
                        <b>{t("user.posts")}</b>{" "}
                        {user.profile.postsCount > 1 &&
                          `(${user.profile.postsCount})`}
                      </span>
                    }
                    isCurrent={tabState === 0}
                    onClick={() => setTabState(0)}
                  />
                  <TabItem
                    text={
                      <span>
                        <b>{t("user.comments")}</b>{" "}
                        {user.profile.commentsCount > 1 &&
                          `(${user.profile.commentsCount})`}
                      </span>
                    }
                    isCurrent={tabState === 1}
                    onClick={() => setTabState(1)}
                  />
                  <TabItem
                    text={
                      <span>
                        <b>{t("user.liked_posts")}</b>{" "}
                        {user.profile.likesCount > 1 &&
                          `(${user.profile.likesCount})`}
                      </span>
                    }
                    isCurrent={tabState === 2}
                    onClick={() => setTabState(2)}
                  />
                </>
              )}
            </div>
            <div>
              {tabState === 0 || tabState === 2 ? (
                <div>
                  {(postsLoading && !postsData) || !postsQueryCalled ? (
                    <div className="p-4">
                      <MySpinner />
                    </div>
                  ) : !postsData ? (
                    <ErrorText>{t("errors.500")}</ErrorText>
                  ) : (
                    <>
                      <div className="divide-y border-b">
                        {postsData.posts.posts.map((post) => (
                          <Post key={post.id} post={post} me={loggedUser} />
                        ))}
                      </div>
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
              ) : (
                <div>
                  {(commentsLoading && !commentsData) ||
                  !commentsQueryCalled ? (
                    <div className="p-4">
                      <MySpinner />
                    </div>
                  ) : !commentsData ? (
                    <ErrorText>{t("errors.500")}</ErrorText>
                  ) : (
                    <>
                      <div className="divide-y border-b">
                        {commentsData.comments.comments.map((comment) => (
                          <PostComment
                            key={comment.id}
                            comment={comment}
                            me={loggedUser}
                            showPostInfo
                          />
                        ))}
                      </div>
                      {commentsData.comments.hasMore && (
                        <div className="flex justify-center p-5">
                          <MyButton
                            isLoading={commentsLoading}
                            onClick={() => {
                              fetchMoreComments!({
                                variables: {
                                  ...commentsVariables,
                                  skip: commentsData.comments.comments.length,
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
