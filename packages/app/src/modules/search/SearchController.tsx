import React from "react";
import { useEffect } from "react";
import { Text, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { SearchNavProps } from "../../navigation/AppTabs/Stacks/Search/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PostsTab } from "./tabs/PostsTab";
import { UsersTab } from "./tabs/UsersTab";

export const SearchController: React.FC<any> = ({
  route,
}: SearchNavProps<"Search">) => {
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
                fontFamily: fontFamily.inter.bold,
                fontSize: fontSize.paragraph,
                color: props.focused ? colors.primary600 : colors.primary500,
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
