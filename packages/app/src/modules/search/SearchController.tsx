import React, { useEffect, useState } from "react";
import { usePostsLazyQuery, useUsersLazyQuery } from "@ferman-pkgs/controller";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { TextInput, useWindowDimensions, View, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { PostsTab } from "./tabs/PostsTab";
import { UsersTab } from "./tabs/UsersTab";
import { colors, fontFamily, fontSize } from "../../constants/style";

export const SearchController: React.FC = ({}) => {
  const layout = useWindowDimensions();
  const { t } = useTypeSafeTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "posts", title: t("search.tabs.posts_tab") },
    { key: "users", title: t("search.tabs.users_tab") },
  ]);

  const renderScene = SceneMap({
    posts: PostsTab,
    users: UsersTab,
  });

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

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

  const [
    runUsersQuery,
    {
      loading: usersLoading,
      data: usersData,
      error: usersError,
      fetchMore: fetchMoreUsers,
      variables: usersVariables,
      called: usersQueryCalled,
    },
  ] = useUsersLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: null,
      query: null,
    },
  });

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      // if (tabState === 0) {
      return runPostsQuery({
        variables: {
          ...postsVariables!,
          query: debouncedQuery,
          skip: null,
        },
      });
      // } else if (tabState === 1) {
      //   return runUsersQuery({
      //     variables: {
      //       ...usersVariables!,
      //       query: debouncedQuery,
      //       skip: null,
      //     },
      //   });
      // }
    }
  }, [debouncedQuery]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={(props) => (
            <Text
              style={{
                margin: 4,
                fontFamily: fontFamily.roboto.medium,
                fontSize: fontSize.paragraph,
                color: props.focused ? colors.primary700 : colors.primary500,
              }}
            >
              {props.route.title}
            </Text>
          )}
          indicatorStyle={{
            backgroundColor: colors.primary100,
            height: "100%",
            borderBottomColor: colors.primary600,
            borderBottomWidth: 3,
          }}
          style={{
            backgroundColor: colors.primary50,
            borderBottomColor: "white",
          }}
        />
      )}
    />
  );
};
