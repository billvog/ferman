import { FullUserFragment, usePostsQuery } from "@ferman-pkgs/controller";
import Link from "next/link";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { CreatePostModal } from "../post/create/CreatePostModal";

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

  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <div>
      {!user ? (
        <MySpinner />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="heading">
              {user ? t("index.feed") : t("index.recent_posts")}
            </h1>
            <div className="flex flex-row space-x-2">
              {user && (
                <Link href="/explore/posts">
                  <MyButton
                    color="primary"
                    square
                    title={t("index.explore_posts")}
                  >
                    <MdExplore />
                  </MyButton>
                </Link>
              )}
              <Link href="/search">
                <MyButton color="accent" square title={t("index.search_posts")}>
                  <BsSearch />
                </MyButton>
              </Link>
              {user && (
                <MyButton
                  color="secondary"
                  onClick={() => setShowCreatePost(true)}
                >
                  {t("index.post_now")}
                </MyButton>
              )}
            </div>
          </div>
          {postsLoading && !postsData ? (
            <div className="mt-4">
              <MySpinner />
            </div>
          ) : postsError || !postsData ? (
            <ErrorText>{t("errors.500")}</ErrorText>
          ) : postsData.posts.posts.length === 0 ? (
            <div className="text-primary-450">{t("common.no_posts")}</div>
          ) : (
            <div className="mt-2 space-y-2">
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
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />
    </div>
  );
};
