import { FullUserFragment, usePostsQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import processString from "react-process-string";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { Post } from "../../../components/Post";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { AuthContext } from "../../auth/AuthProvider";

interface ExplorePostsControllerProps {}

export const ExplorePostsController: React.FC<ExplorePostsControllerProps> =
  ({}) => {
    const { t } = useTypeSafeTranslation();
    const router = useRouter();

    const { me } = useContext(AuthContext);

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
        skip: 0,
        fromFollowed: false,
      },
    });

    return (
      <div>
        {(postsLoading && !postsData) ||
        !postsData ||
        typeof me === "undefined" ? (
          <div className="p-4">
            <MySpinner />
          </div>
        ) : postsError && !postsData ? (
          <ErrorText>{t("errors.500")}</ErrorText>
        ) : postsData.posts.posts.length === 0 ? (
          <div className="text-primary-400 text-sm p-4">
            <span className="mb-2 block">{t("explore.posts.no_posts")}</span>
            {me && (
              <span>
                {processString([
                  {
                    regex: /@(.*)@/,
                    fn: (key: any, res: any) => (
                      <span
                        key={key}
                        className="text-accent hover:text-accent-washed-out hover:underline font-bold cursor-pointer"
                        onClick={() =>
                          router.push(router.pathname, "/post", {
                            shallow: true,
                          })
                        }
                      >
                        {res[1]}
                      </span>
                    ),
                  },
                ])(t("explore.posts.maybe_you_want_to_post"))}
              </span>
            )}
          </div>
        ) : (
          <div>
            <div className="divide-y border-b">
              {postsData.posts.posts.map((post) => (
                <Post key={post.id} post={post} me={me} />
              ))}
            </div>
          </div>
        )}
        {postsData?.posts.posts && postsData?.posts?.hasMore && (
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
      </div>
    );
  };
