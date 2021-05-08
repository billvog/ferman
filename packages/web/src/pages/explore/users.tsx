import { useMeQuery, useUsersLazyQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserCard } from "../../components/UserCard";
import { withMyApollo } from "../../utils/withMyApollo";
import randomCountry from "random-country-name";
import Head from "next/head";
import { UserSummaryCard } from "../../components/UserSummaryCard";

const ExploreUsers: React.FC = () => {
  const router = useRouter();

  const [locationDebouncedQuery, setLocationDebouncedQuery] = useState(
    (router.query.location as string) || (randomCountry.random() as string)
  );
  const [locationQuery, setLocationQuery] = useState(locationDebouncedQuery);

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const [
    runUsersQuery,
    {
      data: usersData,
      loading: usersLoading,
      fetchMore: fetchMoreUsers,
      variables: usersVariables,
      called: usersQueryCalled,
    },
  ] = useUsersLazyQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 15,
      skip: 0,
      location: "",
    },
  });

  useEffect(() => {
    const handle = setTimeout(() => {
      setLocationDebouncedQuery(locationQuery);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [locationQuery]);

  useEffect(() => {
    router.replace({
      query: !!locationDebouncedQuery
        ? {
            location: locationDebouncedQuery,
          }
        : undefined,
    });

    if (locationDebouncedQuery.length > 0) {
      runUsersQuery({
        variables: {
          ...usersVariables!,
          location: locationDebouncedQuery,
          skip: null,
        },
      });
    }
  }, [locationDebouncedQuery]);

  return (
    <Layout
      size="lg"
      title={`${
        typeof router.query.location === "string"
          ? `Find users in ${router.query.location}`
          : "Find users"
      } – Ferman`}
    >
      <Head>
        <meta
          name="description"
          content={`Find users located at ${router.query.location}, find new people at your location and make new friends.s`}
        />
      </Head>
      <div className="flex flex-col mb-3 xs:flex-row xs:items-center xs:mb-1 leading-none">
        <h1 className="text-xl font-bold text-primary-600">
          Find users located at
        </h1>
        <input
          className="flex-1 xs:ml-2.5 outline-none border-b-2 border-dotted border-primary-450 text-xl text-primary-600 font-semibold"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
      </div>
      {meLoading || (usersLoading && !usersData) ? (
        <MySpinner />
      ) : !usersData && usersQueryCalled ? (
        <ErrorText>Internal server error, please try again later</ErrorText>
      ) : usersQueryCalled && usersData!.users.users.length === 0 ? (
        <div className="text-red-500 font-semibold text-sm mt-2">
          There are no users matching this location...
        </div>
      ) : usersQueryCalled ? (
        <>
          <div className="xs:mb-4 mb-5 font-semibold text-primary-400 text-xs">
            Found {usersData!.users.count} result
            {usersData!.users.count !== 1 ? "s" : ""} in{" "}
            {usersData!.users.executionTime
              ? usersData!.users.executionTime / 1000
              : 0}{" "}
            seconds
          </div>
          <div className="space-y-2">
            {usersData!.users.users.map((user) => (
              <UserSummaryCard
                me={meData?.me || null}
                user={user}
                key={user.id}
              />
            ))}
          </div>
        </>
      ) : null}
      {usersData?.users.users && usersData?.users.hasMore && (
        <div className="flex justify-center mt-5">
          <MyButton
            isLoading={usersLoading}
            onClick={() => {
              fetchMoreUsers!({
                variables: {
                  ...usersVariables,
                  skip: usersData.users.users.length,
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

export default withMyApollo({
  ssr: true,
})(ExploreUsers);
