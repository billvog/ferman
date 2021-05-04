import React from "react";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../utils/withMyApollo";
import { Post } from "../../components/Post";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import Link from "next/link";

const ExplorePosts = () => {
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

  return (
    <Layout
      size="lg"
      title="Explore posts – Ferman"
      description="Explore the most recent posts on Ferman."
    >
      <h1 className="heading">Most recent posts</h1>
      {(postsLoading && !postsData) || !postsData || meLoading ? (
        <MySpinner />
      ) : postsError && !postsData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <div className="text-gray-400 text-sm">
          I'm sad to report you that there are no posts. <br />
          <span className="text-gray-500">
            Maybe you want to{" "}
            <Link href="/post">
              <span className="text-accent hover:text-accent-washed-out hover:underline font-bold cursor-pointer">
                post
              </span>
            </Link>{" "}
            something?
          </span>
        </div>
      ) : (
        <div>
          <div className="mb-4 mt-1 text-gray-400 text-xs">
            Found {postsData?.posts.count} result
            {postsData?.posts.count !== 1 ? "s" : ""} in{" "}
            {postsData?.posts.executionTime
              ? postsData?.posts.executionTime / 1000
              : 0}{" "}
            seconds
          </div>
          <div className="mt-3">
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

export default withMyApollo({ ssr: true })(ExplorePosts);
