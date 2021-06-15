import { usePostsQuery } from "@ferman-pkgs/controller";
import React, { useContext } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../auth/AuthProvider";

interface FeedContollerProps {}
export const FeedController: React.FC<FeedContollerProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const { me } = useContext(AuthContext);

  const {
    loading: postsLoading,
    data: postsData,
    error: postsError,
    fetchMore: fetchMorePosts,
    variables: postsVariables,
  } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    skip: typeof me === "undefined",
    variables: {
      limit: 15,
      fromFollowed: !!me,
      skip: 0,
    },
  });

  return (
    <div>
      {(postsLoading && !postsData) || typeof me === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : postsError || !postsData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <div className="p-4 text-primary-450">{t("common.no_posts")}</div>
      ) : (
        <div className="divide-y border-b">
          {postsData.posts.posts.map((post) => (
            <Post key={post.id} post={post} me={me} />
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
    </div>
  );
};
