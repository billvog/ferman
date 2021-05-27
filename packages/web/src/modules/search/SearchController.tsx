import { usePostsLazyQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { Post } from "../../components/Post";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { WithAuthProps } from "../../types/WithAuthProps";
import { TabItem, TabState } from "./SearchTabs";
import { SearchTips } from "./SearchTips";

interface SearchControllerProps extends WithAuthProps {}
export const SearchController: React.FC<SearchControllerProps> = ({
  loggedUser,
}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const [tabState, setTabState] = useState<TabState>(0);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(
    (router.query.query as string) || ""
  );

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

  return typeof loggedUser === "undefined" ? (
    <div className="p-4">
      <MySpinner />
    </div>
  ) : (
    <>
      <div className="p-4">
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
      <div className="flex justify-center items-center">
        <TabItem
          text={<b>Posts</b>}
          isCurrent={tabState === 0}
          onClick={() => setTabState(0)}
        />
        <TabItem
          text={<b>People</b>}
          isCurrent={tabState === 1}
          onClick={() => setTabState(1)}
        />
      </div>
      <div>
        {postsError && !postsData ? (
          <ErrorText>{t("errors.500")}</ErrorText>
        ) : tabState === 0 ? (
          <>
            {postsQueryCalled && postsLoading && !postsData ? (
              <div className="p-4">
                <MySpinner />
              </div>
            ) : !postsData ? (
              <div className="p-4 pt-0">
                <div className="text-red-400 mt-2 text-sm">
                  {t("search.search_field_subtext")}
                </div>
                {<SearchTips />}
              </div>
            ) : postsData.posts.count === 0 ? (
              <div className="p-4 pt-0">
                <div className="text-red-400 mt-2 text-sm">
                  {t("search.found_nothing")}
                </div>
                {<SearchTips />}
              </div>
            ) : (
              <>
                <div className="p-4 pt-1 font-semibold text-primary-400 text-xs">
                  {postsData.posts.count !== 1 ? (
                    <div>
                      {t("common.found_x_results")
                        .replace("%count%", postsData.posts.count.toString())
                        .replace(
                          "%seconds%",
                          Number(
                            postsData?.posts.executionTime / 1000
                          ).toString()
                        )}
                    </div>
                  ) : (
                    <div>
                      {t("common.found_one_result").replace(
                        "%seconds%",
                        Number(postsData?.posts.executionTime / 1000).toString()
                      )}
                    </div>
                  )}
                </div>
                <div className="divide-y border-t border-b">
                  {postsData.posts.posts.map((post) => (
                    <Post key={post.id} post={post} me={loggedUser} />
                  ))}
                </div>
                {postsData.posts.hasMore && (
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
          </>
        ) : tabState === 1 ? (
          <></>
        ) : null}
      </div>
    </>
  );
};
