import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import Link from "next/link";
import React from "react";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { Post } from "../../../components/Post";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import processString from "react-process-string";
import { useState } from "react";
import { CreatePostModal } from "../../post/create/CreatePostModal";

interface ExplorePostsControllerProps {}
export const ExplorePostsController: React.FC<ExplorePostsControllerProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

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
      feedMode: false,
    },
  });

  const [showCreatePost, setShowCreatePost] = useState(false);

  return (
    <div>
      {(postsLoading && !postsData) || !postsData || meLoading ? (
        <MySpinner />
      ) : postsError && !postsData ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <div className="text-primary-400 text-sm">
          {t("explore.posts.no_posts")} <br />
          {meData?.me &&
            processString([
              {
                regex: /(@)(.*)(@)/,
                fn: (key: any, res: any) => (
                  <span
                    key={key}
                    className="text-accent hover:text-accent-washed-out hover:underline font-bold cursor-pointer"
                    onClick={() => setShowCreatePost(true)}
                  >
                    {res[2]}
                  </span>
                ),
              },
            ])(t("explore.posts.maybe_you_want_to_post"))}
        </div>
      ) : (
        <div>
          <div className="space-y-2">
            {postsData.posts.posts.map((post) => (
              <Post key={post.id} post={post} me={meData?.me || null} />
            ))}
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
            load more
          </MyButton>
        </div>
      )}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
      />
    </div>
  );
};
