import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { useUserQuery } from "../../../../controller/dist";
import { CenterSpinner } from "../../components/CenterSpinner";
import { ErrorText } from "../../components/ErrorText";
import { ScrollViewLoadMore } from "../../components/ScrollViewLoadMore";
import { UserCard } from "../../components/UserCard";
import { HomeNavProps } from "../../navigation/AppTabs/Stacks/Home/ParamList";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

export const UserProfileController: React.FC<any> = ({
  navigation,
  route,
}: HomeNavProps<"UserProfile">) => {
  const { t } = useTypeSafeTranslation();

  const {
    data: userData,
    error: userError,
    loading: userLoading,
    refetch: refreshUser,
    variables: userVariables,
    client,
  } = useUserQuery({
    skip: typeof route.params === "undefined",
    variables: {
      id: route.params.userId,
    },
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshUserHandler = async () => {
    // update state
    setIsRefreshing(true);
    // clear cache from query
    client.cache.evict({
      id: "User:" + userData?.user?.id,
    });
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

  return (
    <View style={{ flex: 1 }}>
      {userLoading ? (
        <CenterSpinner />
      ) : !userData && userError ? (
        <ErrorText>{t("errors.oops")}</ErrorText>
      ) : !userData?.user ? (
        <ErrorText>{t("user.not_found")}</ErrorText>
      ) : (
        <ScrollViewLoadMore
          isLoading={userLoading && !isRefreshing}
          isRefreshing={isRefreshing}
          onRefresh={refreshUserHandler}
          onLoadMore={() => {}}
          shouldLoadMore={false}
          scrollViewProps={{
            style: {
              flex: 1,
            },
          }}
        >
          <UserCard user={userData.user} key={`user:${userData.user.id}`} />
        </ScrollViewLoadMore>
      )}
    </View>
  );
};
