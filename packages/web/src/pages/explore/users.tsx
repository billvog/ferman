import { useMeQuery, useUsersLazyQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { MyButton } from "../../components/MyButton";
import { MySpinner } from "../../components/MySpinner";
import { UserCard } from "../../components/UserCard";
import { withMyApollo } from "../../utils/withMyApollo";
import randomCountry from "random-country-name";

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
      description={`Find users located at ${router.query.location}, find new people at your location and make new friends.s`}
    >
      <div className="flex flex-row items-center mb-1 leading-none">
        <h1 className="text-xl font-bold text-secondary">
          Find users located at
        </h1>
        <input
          className="flex-1 ml-2.5 outline-none border-b-2 border-dotted border-secondary text-xl text-secondary font-semibold"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
      </div>
      {meLoading || (usersLoading && !usersData) ? (
        <MySpinner />
      ) : !usersData && usersQueryCalled ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : usersQueryCalled && usersData!.users.users.length === 0 ? (
        <div className="text-red-500 font-semibold text-sm mt-2">
          There are no users matching this location...
        </div>
      ) : usersQueryCalled ? (
        <>
          <div className="mb-4 text-gray-400 text-xs">
            Found {usersData!.users.count} result
            {usersData!.users.count !== 1 ? "s" : ""} in{" "}
            {usersData!.users.executionTime
              ? usersData!.users.executionTime / 1000
              : 0}{" "}
            seconds
          </div>
          {usersData!.users.users.map((user) => (
            <UserCard
              me={meData?.me || null}
              user={user}
              key={user.id}
              marginBottom={10}
              minimal
            />
          ))}
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
