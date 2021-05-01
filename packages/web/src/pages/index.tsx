import React from "react";
import { Layout } from "../components/Layout";
import { useMeQuery, usePostsQuery } from "@ferman-pkgs/controller";
import NextLink from "next/link";
import { withMyApollo } from "../utils/withMyApollo";
import { Post } from "../components/Post";
import { ErrorText } from "../components/ErrorText";
import { MyButton } from "../components/MyButton";
import { MyIconButton } from "../components/MyIconButton";
import { MySpinner } from "../components/MySpinner";
import { BsSearch } from "react-icons/bs";
import { MdExplore } from "react-icons/md";

const Index = () => {
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
    <Layout size="lg" title="Feed – Ferman">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-800 font-bold">
          {meData ? (meData?.me ? "Feed" : "Recent posts") : ""}
        </h1>
        <div className="flex flex-row space-x-2">
          <NextLink href="/explore/posts">
            <MyIconButton
              icon={<MdExplore />}
              style={{ backgroundColor: " peru" }}
            />
          </NextLink>
          <NextLink href="/search">
            <MyIconButton
              icon={<BsSearch />}
              style={{ backgroundColor: "brown" }}
            />
          </NextLink>
          {meData?.me && (
            <NextLink href="/post">
              <MyButton>post now</MyButton>
            </NextLink>
          )}
        </div>
      </div>
      {(postsLoading && !postsData) || !postsData || meLoading ? (
        <MySpinner />
      ) : postsError && !postsData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : postsData.posts.posts.length === 0 ? (
        <div className="text-gray-500">There are no posts...</div>
      ) : (
        <div className="mt-3">
          {postsData.posts.posts.map((post) => (
            <Post key={post.id} post={post} me={meData?.me || null} clickable />
          ))}
        </div>
      )}
      {postsData?.posts.posts && postsData?.posts?.hasMore && (
        <div className="flex justify-center mt-5">
          <MyButton
            isLoading={postsLoading}
            style={{
              backgroundColor: "brown",
            }}
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

export default withMyApollo({ ssr: true })(Index);
