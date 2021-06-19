import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar } from "react-native-tab-view";
import { CollapsibleHeaderTabView } from "react-native-tab-view-collapsible-header";
import { useUserQuery } from "../../../../controller/dist";
import { CenterSpinner } from "../../components/CenterSpinner";
import { ErrorText } from "../../components/ErrorText";
import { UserCard } from "../../components/UserCard";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { HomeNavProps } from "../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { PostsTab } from "./profileTabs/PostsTab";

export const UserProfileController: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"UserProfile">) => {
  const { t } = useTypeSafeTranslation();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "posts", title: t("user.posts") },
    { key: "replies", title: t("user.replies") },
    { key: "likes", title: t("user.liked_posts") },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const stopRefreshing = () => setIsRefreshing(false);

  const renderScene = SceneMap({
    posts: () => (
      <PostsTab
        tabIsRefreshing={isRefreshing}
        stopRefreshing={stopRefreshing}
        user={userData?.user || null}
        index={0}
        tab="posts"
      />
    ),
    replies: () => (
      <PostsTab
        tabIsRefreshing={isRefreshing}
        stopRefreshing={stopRefreshing}
        user={userData?.user || null}
        index={1}
        tab="replies"
      />
    ),
    likes: () => (
      <PostsTab
        tabIsRefreshing={isRefreshing}
        stopRefreshing={stopRefreshing}
        user={userData?.user || null}
        index={2}
        tab="likes"
      />
    ),
  });

  const {
    data: userData,
    error: userError,
    loading: userLoading,
    refetch: refreshUser,
    variables: userVariables,
  } = useUserQuery({
    skip: typeof route.params === "undefined",
    notifyOnNetworkStatusChange: true,
    variables: {
      id: route.params.userId,
      uid: route.params.userUid,
    },
  });

  const refreshUserHandler = async () => {
    // update state
    setIsRefreshing(true);
    // refetch
    await refreshUser(userVariables);
    // update state
    setIsRefreshing(false);
  };

  useLayoutEffect(() => {
    if (userData?.user?.uid) {
      navigation.setOptions({
        headerTitle: userData.user.username,
      });
    }
  }, [userData?.user?.uid]);

  useEffect(() => {
    if (isRefreshing) {
      refreshUserHandler();
    }
  }, [isRefreshing]);

  return (
    <View style={{ flex: 1 }}>
      {userLoading ? (
        <CenterSpinner />
      ) : !userData && userError ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
      ) : !userData?.user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : (
        <CollapsibleHeaderTabView
          renderScrollHeader={() => (
            <View
              style={{
                backgroundColor: colors.primary100,
              }}
              children={
                <UserCard
                  user={userData.user!}
                  key={`user:${userData.user!.id}`}
                />
              }
            />
          )}
          onStartRefresh={() => setIsRefreshing(true)}
          isRefreshing={isRefreshing}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          scrollEnabled={true}
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
                    color: props.focused
                      ? colors.primary600
                      : colors.primary500,
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
      )}
    </View>
  );
};
