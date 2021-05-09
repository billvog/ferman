import React from "react";
import { Layout } from "../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import NextLink from "next/link";
import { withMyApollo } from "../utils/withMyApollo";
import { Post } from "../components/Post";
import { ErrorText } from "../components/ErrorText";
import { MyButton } from "../components/MyButton";
import { MySpinner } from "../components/MySpinner";
import { BsSearch } from "react-icons/bs";
import { MdExplore } from "react-icons/md";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

const Index = () => {
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
      query: null,
    },
  });

  return (
    <Layout title={`${t("index.title")} – Ferman`}>
      {meLoading ? (
        <MySpinner />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="heading">
              {meData?.me ? t("index.feed") : t("index.recent_posts")}
            </h1>
            <div className="flex flex-row space-x-2">
              {meData?.me && (
                <NextLink href="/explore/posts">
                  <MyButton
                    color="primary"
                    square
                    title={t("index.explore_posts")}
                  >
                    <MdExplore />
                  </MyButton>
                </NextLink>
              )}
              <NextLink href="/search">
                <MyButton color="accent" square title={t("index.search_posts")}>
                  <BsSearch />
                </MyButton>
              </NextLink>
              {meData?.me && (
                <NextLink href="/post">
                  <MyButton color="secondary">{t("index.post_now")}</MyButton>
                </NextLink>
              )}
            </div>
          </div>
          {postsLoading && !postsData ? (
            <MySpinner />
          ) : postsError || !postsData ? (
            <ErrorText>{t("errors.500")}</ErrorText>
          ) : postsData.posts.posts.length === 0 ? (
            <div className="text-primary-450">{t("common.no_posts")}</div>
          ) : (
            <div className="mt-2 space-y-2">
              {postsData.posts.posts.map((post) => (
                <Post key={post.id} post={post} me={meData?.me || null} />
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
    </Layout>
  );
};

export default withMyApollo({ ssr: true })(Index);
