import { FullUserFragment, usePostsQuery } from "@ferman-pkgs/controller";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

interface FeedContollerProps {
  user: FullUserFragment | null | undefined;
}

export const FeedController: React.FC<FeedContollerProps> = ({ user }) => {
  const { t } = useTypeSafeTranslation();

  const {
    loading: postsLoading,
    data: postsData,
    error: postsError,
    fetchMore: fetchMorePosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      query: null,
    },
  });

  return (
    <div>
      {typeof user === "undefined" ? (
        <MySpinner />
      ) : (
        <>
          {postsLoading && !postsData ? (
            <div className="mt-4">
              <MySpinner />
            </div>
          ) : postsError || !postsData ? (
            <ErrorText>{t("errors.500")}</ErrorText>
          ) : postsData.posts.posts.length === 0 ? (
            <div className="text-primary-450">{t("common.no_posts")}</div>
          ) : (
            <div className="divide-y">
              {postsData.posts.posts.map((post) => (
                <Post key={post.id} post={post} me={user} />
              ))}
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
        </>
      )}
    </div>
  );
};
