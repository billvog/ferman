import { useFollowersQuery } from "@ferman-pkgs/controller";
import React, { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../components/CenterSpinner";
import { ErrorText } from "../../components/ErrorText";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { HomeNavProps } from "../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const UserFollowersController: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"UserFollowers">) => {
  const { t } = useTypeSafeTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: followersData,
    error: followersError,
    loading: followersLoading,
    fetchMore: loadMoreFollowers,
    variables: followersVariables,
    refetch: refreshFollowers,
    client,
  } = useFollowersQuery({
    skip: typeof route.params === "undefined",
    variables: {
      userId: route.params.userId,
      limit: 15,
      skip: 0,
    },
  });

  const refreshFollowersHandler = async () => {
    // update state
    setIsRefreshing(true);
    // clear cache from query
    client.cache.evict({
      fieldName: "followers",
    });
    // refetch
    await refreshFollowers({
      ...followersVariables,
      skip: 0,
    });
    // update state
    setIsRefreshing(false);
  };

  useLayoutEffect(() => {
    if (followersData?.followers?.count) {
      navigation.setOptions({
        headerTitle: `${t("user.followers.raw")} (${
          followersData.followers.count
        })`,
      });
    }
  }, [followersData?.followers?.count]);

  return (
    <View style={{ flex: 1 }}>
      {!followersData && followersLoading ? (
        <CenterSpinner />
      ) : !followersData && followersError ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
      ) : (
        <ScrollViewLoadMore
          isLoading={followersLoading && !isRefreshing}
          isRefreshing={isRefreshing}
          onRefresh={refreshFollowersHandler}
          onLoadMore={() => {
            loadMoreFollowers({
              variables: {
                ...followersVariables,
                skip: followersData?.followers?.users.length,
              },
            });
          }}
          shouldLoadMore={followersData?.followers?.hasMore || false}
          scrollViewProps={{
            style: {
              flex: 1,
            },
          }}
        >
          {followersData?.followers?.count === 0 ? (
            <View
              style={{
                marginTop: 18,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.primary500,
                  fontSize: fontSize.h5,
                  fontFamily: fontFamily.inter.medium,
                }}
              >
                {t("user.followers.no_users")}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "column",
              }}
            >
              {followersData?.followers?.users.map((u) => (
                <UserSummaryCard key={`follower:${u.id}`} user={u} />
              ))}
            </View>
          )}
        </ScrollViewLoadMore>
      )}
    </View>
  );
};
