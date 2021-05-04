import React, { useEffect, useState } from "react";
import { ErrorText } from "../components/ErrorText";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { useMeQuery, usePostsLazyQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../utils/withMyApollo";
import { useRouter } from "next/router";
import { MySpinner } from "../components/MySpinner";
import { MyButton } from "../components/MyButton";

const SearchTips = () => {
  return (
    <div className="mt-2 text-sm text-gray-700">
      <b>Search Tips</b> <br />
      <ul
        className="list-disc"
        style={{
          marginLeft: 20,
        }}
      >
        <li>Be careful of wrong syntax or misspelled words</li>
        <li>Be more precise</li>
        <li>Use keywords</li>
      </ul>
    </div>
  );
};

const SearchPost = () => {
  const router = useRouter();

  const [query, setQuery] = useState((router.query.query as string) || "");
  const [debouncedQuery, setDebouncedQuery] = useState("");

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
    if (
      typeof router.query.query === "string" &&
      router.query.query.length > 0
    ) {
      runPostsQuery({
        variables: {
          ...postsVariables!,
          query: router.query.query,
          skip: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (router.query.query && router.query.query !== query) {
      setQuery(router.query.query as string);
    }
  }, [router.query.query]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    router.replace({
      query: debouncedQuery
        ? {
            query: debouncedQuery,
          }
        : undefined,
    });

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

  return (
    <Layout size="lg" title="Search – Ferman">
      <div>
        <div className="flex leading-tight">
          <div className="flex-1 mb-1">
            <input
              className="bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-75 border-none rounded-xl w-full text-sm leading-6 focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search keywords, @mentions, #hashtags"
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
        <ErrorText>Internal server error (500)</ErrorText>
      ) : !postsData ? (
        <div>
          <div className="text-red-400 mt-2 text-sm">
            Enter keywords, #hashtags or @mentions in the search field to get
            some results.
          </div>
          {SearchTips()}
        </div>
      ) : postsData.posts.posts.length === 0 ? (
        <div>
          <div className="text-red-400 mt-2 text-sm">
            We found nothing matching the given terms.
          </div>
          {SearchTips()}
        </div>
      ) : (
        <div>
          <div className="mb-4 mt-1 text-gray-400 text-xs">
            Found <b>{postsData?.posts.count}</b> result
            {postsData?.posts.count !== 1 ? "s" : ""} in{" "}
            <b>
              {postsData?.posts.executionTime
                ? postsData?.posts.executionTime / 1000
                : 0}
            </b>{" "}
            seconds
          </div>
          <div>
            {postsData.posts.posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                me={meData?.me || null}
                clickable
              />
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
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(SearchPost);
