import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { useGetPostFromUrl } from "../../shared-hooks/useGetPostFromUrl";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../types/WithAuthProps";

interface PostControllerProps extends WithAuthProps {}
export const PostController: React.FC<PostControllerProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const {
    data: postsData,
    loading: postsLoading,
    variables: postsVariables,
    fetchMore: fetchMorePosts,
  } = useGetPostFromUrl({
    limit: 15,
    skip: 0,
  });

  return (
    <div>
      {(postsLoading && !postsData) || typeof loggedUser === "undefined" ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !postsData?.posts.parent ? (
        <ErrorText>{t("post.not_found")}</ErrorText>
      ) : !postsData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : (
        <div className="relative flex flex-col">
          <div className="w-full border-b">
            <div>
              <Post
                key={postsData.posts.parent.id}
                post={postsData.posts.parent}
                me={loggedUser}
                onDelete={() => router.back()}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex p-3 pb-0 justify-between items-center">
              <div className="text-lg text-primary-600">
                <b>{t("post.replies")}</b>{" "}
                {!!postsData.posts.parent.repliesCount &&
                  `(${postsData.posts.parent.repliesCount})`}
              </div>
              {loggedUser && (
                <MyButton
                  onClick={() =>
                    router.push(
                      {
                        pathname: router.pathname,
                        query: router.query,
                      },
                      `/post`
                    )
                  }
                >
                  {t("post.reply")}
                </MyButton>
              )}
            </div>
            <div>
              {postsData.posts.parent.repliesCount === 0 ? (
                <div className="text-sm text-primary-450 px-3">
                  {t("post.no_replies")}
                </div>
              ) : (
                <div className="divide-y border-t border-b mt-3">
                  {postsData.posts.posts.map((post) => (
                    <Post key={post.id} post={post} me={loggedUser} />
                  ))}
                </div>
              )}
            </div>
            {postsData?.posts.hasMore && (
              <div className="flex justify-center mt-5">
                <MyButton
                  isLoading={postsLoading}
                  onClick={() => {
                    fetchMorePosts({
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
        </div>
      )}
    </div>
  );
};
