import { useUsersLazyQuery } from "@ferman-pkgs/controller";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { CenterSpinner } from "../../../components/CenterSpinner";
import { fieldStyle } from "../../../components/InputField";
import { MyButton } from "../../../components/MyButton";
import { ScrollViewLoadMore } from "../../../components/ScrollViewLoadMore";
import { UserSummaryCard } from "../../../components/UserSummaryCard";
import { colors, fontFamily, fontSize } from "../../../constants/style";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";
import { searchTabStyles as tabStyles } from "./tabStyles";

interface UsersTabProps {}

export const UsersTab: React.FC<UsersTabProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [
    runUsersQuery,
    {
      loading: usersLoading,
      data: usersData,
      error: usersError,
      fetchMore: loadMoreUsers,
      refetch: refreshUsers,
      variables: usersVariables,
      called: usersQueryCalled,
      client,
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
      return runUsersQuery({
        variables: {
          ...usersVariables!,
          query: debouncedQuery,
          skip: null,
        },
      });
    }
  }, [debouncedQuery]);

  const refreshUsersHandler = async () => {
    // update state
    setIsRefreshing(true);
    // clear cache from query
    client.cache.evict({
      fieldName: "users",
    });
    // refetch
    await refreshUsers({
      ...usersVariables,
      skip: 0,
    });
    // update state
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View>
        <TextInput
          placeholder={t("search.search_field_placeholder")}
          value={query}
          onChangeText={setQuery}
          style={[
            fieldStyle,
            {
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderRadius: 0,
            },
          ]}
        />
        {!usersQueryCalled ? (
          <View style={tabStyles.searchTipContainer}>
            <Text style={tabStyles.searchTipText}>
              {t("search.search_posts_field_subtext")}
            </Text>
          </View>
        ) : usersData && usersData.users.count > 0 ? (
          <Text style={tabStyles.fieldSubText}>
            {usersData?.users.count === 1
              ? t("common.found_one_result").replace(
                  "%seconds%",
                  Number(usersData?.users.executionTime / 1000).toString()
                )
              : t("common.found_x_results")
                  .replace("%count%", usersData?.users.count.toString())
                  .replace(
                    "%seconds%",
                    Number(usersData?.users.executionTime / 1000).toString()
                  )}
          </Text>
        ) : null}
      </View>
      {!usersData && usersLoading && !isRefreshing ? (
        <CenterSpinner />
      ) : !usersData && usersError ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.error,
              fontSize: fontSize.h5,
              fontFamily: fontFamily.inter.medium,
              marginBottom: 16,
            }}
          >
            {t("errors.500")}
          </Text>
          <MyButton
            style="danger"
            onPress={refreshUsersHandler}
            title="Retry"
            isLoading={usersLoading}
          />
        </View>
      ) : usersQueryCalled ? (
        <View style={[tabStyles.resultsContainer, { flex: 1 }]}>
          <ScrollViewLoadMore
            isLoading={usersLoading && !isRefreshing}
            isRefreshing={isRefreshing}
            onRefresh={refreshUsersHandler}
            onLoadMore={() => {
              loadMoreUsers({
                variables: {
                  ...usersVariables,
                  skip: usersData.users.users.length,
                },
              });
            }}
            shouldLoadMore={usersData?.users.hasMore}
            scrollViewProps={{
              style: {
                flex: 1,
              },
            }}
          >
            {usersData?.users.count === 0 ? (
              <View
                style={{
                  marginTop: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={tabStyles.foundNothingText}>
                  {t("search.found_nothing")}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "column",
                }}
              >
                {usersData?.users.users.map((u) => (
                  <UserSummaryCard key={`search:${u.id}`} user={u} />
                ))}
              </View>
            )}
          </ScrollViewLoadMore>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
