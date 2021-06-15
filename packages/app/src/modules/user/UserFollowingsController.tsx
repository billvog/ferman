import { useFollowingsQuery } from "@ferman-pkgs/controller";
import React, { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { CenterSpinner } from "../../components/CenterSpinner";
import { ErrorText } from "../../components/ErrorText";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { UserSummaryCard } from "../../components/UserSummaryCard";
import { colors, fontFamily, fontSize } from "../../constants/style";
import { HomeNavProps } from "../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const UserFollowingsController: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"UserFollowings">) => {
  const { t } = useTypeSafeTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: followingsData,
    error: followingsError,
    loading: followingsLoading,
    fetchMore: loadMoreFollowings,
    variables: followingsVariables,
    refetch: refreshFollowings,
    client,
  } = useFollowingsQuery({
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
      fieldName: "followings",
    });
    // refetch
    await refreshFollowings({
      ...followingsVariables,
      skip: 0,
    });
    // update state
    setIsRefreshing(false);
  };

  useLayoutEffect(() => {
    if (followingsData?.followings?.count) {
      navigation.setOptions({
        headerTitle: `${t("user.followings.raw")} (${
          followingsData.followings.count
        })`,
      });
    }
  }, [followingsData?.followings?.count]);

  return (
    <View style={{ flex: 1 }}>
      {!followingsData && followingsLoading ? (
        <CenterSpinner />
      ) : !followingsData && followingsError ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
      ) : (
        <ScrollViewLoadMore
          isLoading={followingsLoading && !isRefreshing}
          isRefreshing={isRefreshing}
          onRefresh={refreshFollowersHandler}
          onLoadMore={() => {
            loadMoreFollowings({
              variables: {
                ...followingsVariables,
                skip: followingsData?.followings?.users.length,
              },
            });
          }}
          shouldLoadMore={followingsData?.followings?.hasMore || false}
          scrollViewProps={{
            style: {
              flex: 1,
            },
          }}
        >
          {followingsData?.followings?.count === 0 ? (
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
              {followingsData?.followings?.users.map((u) => (
                <UserSummaryCard key={`following:${u.id}`} user={u} />
              ))}
            </View>
          )}
        </ScrollViewLoadMore>
      )}
    </View>
  );
};
