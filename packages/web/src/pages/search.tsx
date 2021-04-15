import React, { useEffect } from "react";
import { ErrorText } from "../components/ErrorText";
import { Layout } from "../components/Layout";
import { Post } from "../components/Post";
import { SearchField } from "../components/SearchField";
import { useMeQuery, usePostsLazyQuery } from "@ferman-pkgs/controller";
import { withMyApollo } from "../utils/withMyApollo";
import { useRouter } from "next/router";
import { MySpinner } from "../components/MySpinner";
import styled from "styled-components";
import { MyButton } from "../components/MyButton";

const SearchTips = () => {
  return (
    <SearchTipsContainer>
      <span>Search Tips</span> <br />
      <ul
        style={{
          marginLeft: 20,
        }}
      >
        <li>Be careful of wrong syntax or misspelled words</li>
        <li>Be more precise</li>
        <li>Use keywords</li>
      </ul>
    </SearchTipsContainer>
  );
};

const SearchPost = () => {
  const router = useRouter();

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

  return (
    <Layout size="lg" title="Search – Ferman">
      <div>
        <SearchField
          initialValue={(router.query.query as string) || ""}
          onSubmit={(values) => {
            if (values.query.length > 0) {
              return runPostsQuery({
                variables: {
                  ...postsVariables!,
                  query: values.query,
                  skip: null,
                },
              });
            }
          }}
        />
      </div>
      {(postsQueryCalled && ((postsLoading && !postsData) || !postsData)) ||
      meLoading ? (
        <MySpinner />
      ) : postsError && !postsData && !postsQueryCalled ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : !postsData ? (
        <div>
          <NotifyTipText>
            Enter keywords, #hashtags or @mentions in the search field to get
            some results.
          </NotifyTipText>
          {SearchTips()}
        </div>
      ) : postsData.posts.posts.length === 0 ? (
        <div>
          <NotifyTipText>
            We found nothing matching the given terms.
          </NotifyTipText>
          {SearchTips()}
        </div>
      ) : (
        postsData.posts.posts.map((post) => (
          <Post key={post.id} post={post} me={meData?.me || null} clickable />
        ))
      )}
      {postsData?.posts.posts && postsData?.posts?.hasMore && (
        <LoadMoreContainer>
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
        </LoadMoreContainer>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: false,
})(SearchPost);

// Styles
const NotifyTipText = styled.div`
  color: grey;
  font-size: 10.5pt;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SearchTipsContainer = styled.div`
  margin-top: 4px;
  color: grey;
  font-size: 10.5pt;
`;
