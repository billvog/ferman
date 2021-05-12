import React from "react";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../../utils/withMyApollo";
import { Post } from "../../components/Post";
import { ErrorText } from "../../components/ErrorText";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import Link from "next/link";
import Head from "next/head";

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
    <Layout title="Explore posts – Ferman" pageTitle="Most recent posts">
      <Head>
        <meta
          name="description"
          content="Explore the most recent posts on Ferman."
        />
      </Head>
      {(postsLoading && !postsData) || !postsData || meLoading ? (
        <MySpinner />
      ) : postsError && !postsData ? (
        <ErrorText>Internal server error, please try again later</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <div className="text-primary-400 text-sm">
          I'm sad to report you that there are no posts. <br />
          <span className="text-primary-500">
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
    </Layout>
  );
};

export default withMyApollo({ ssr: true })(ExplorePosts);
