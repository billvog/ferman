import React, { useEffect, useState } from "react";
import { ErrorText } from "../components/ErrorText";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { useMeQuery, usePostsLazyQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../utils/withMyApollo";
import { useRouter } from "next/router";
import { MySpinner } from "../components/MySpinner";
import { MyButton } from "../components/MyButton";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { PageHeader } from "../components/PageHeader";

const SearchTips = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <div className="mt-2 text-sm text-primary-700">
      <b>{t("search.search_tips.heading")}</b> <br />
      <ul className="list-disc ml-5">
        <li>{t("search.search_tips.tip_1")}</li>
        <li>{t("search.search_tips.tip_2")}</li>
        <li>{t("search.search_tips.tip_3")}</li>
      </ul>
    </div>
  );
};

const SearchPost = () => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(
    (router.query.query as string) || ""
  );

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const [
    runPostsQuery,
    {
      loading: postsLoading,
      data: postsData,
      error: postsError,
      fetchMore: fetchMorePosts,
      variables: postsVariables,
      called: postsQueryCalled,
    },
  ] = usePostsLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      query: null,
    },
  });

  useEffect(() => {
    if (router.query.query && router.query.query !== query) {
      setQuery(router.query.query as string);
    }
  }, [router.query.query]);

  useEffect(() => {
    router.replace({
      query: !!query
        ? {
            query,
          }
        : undefined,
    });

    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      return runPostsQuery({
        variables: {
          ...postsVariables!,
          query: debouncedQuery,
          skip: null,
        },
      });
    }
  }, [debouncedQuery]);

  const SearchTipsComponent = SearchTips();

  return (
    <Layout
      pageTitle={t("search.title")}
      title={`${t("search.title")} – Ferman`}
    >
      <div>
        <div className="flex leading-tight">
          <div className="flex-1 mb-1">
            <input
              className="bg-primary-100 hover:bg-primary-200 focus:bg-primary-200 transition-colors duration-75 border-none rounded-xl w-full text-sm leading-6 focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder={t("search.search_field_placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      {(postsQueryCalled && ((postsLoading && !postsData) || !postsData)) ||
      meLoading ? (
        <MySpinner />
      ) : postsError && !postsData && !postsQueryCalled ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : !postsData ? (
        <div>
          <div className="text-red-400 mt-2 text-sm">
            {t("search.search_field_subtext")}
          </div>
          {SearchTipsComponent}
        </div>
      ) : postsData.posts.posts.length === 0 ? (
        <div>
          <div className="text-red-400 mt-2 text-sm">
            {t("search.found_nothing")}
          </div>
          {SearchTipsComponent}
        </div>
      ) : (
        <div>
          <div className="mb-4 mt-1 font-semibold text-primary-400 text-xs">
            {postsData.posts.count !== 1 ? (
              <div>
                {t("common.found_x_results")
                  .replace("$1", postsData.posts.count.toString())
                  .replace(
                    "$2",
                    Number(postsData?.posts.executionTime / 1000).toString()
                  )}
              </div>
            ) : (
              <div>
                {t("common.found_one_result").replace(
                  "$1",
                  Number(postsData?.posts.executionTime / 1000).toString()
                )}
              </div>
            )}
          </div>
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
            {t("common.load_more")}
          </MyButton>
        </div>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(SearchPost);
