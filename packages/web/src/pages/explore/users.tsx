import {
  useMeQuery,
  useUsersLazyQuery,
  useUsersQuery,
} from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { MySpinner } from "../../components/MySpinner";
import { UserCard } from "../../components/UserCard";
import { withMyApollo } from "../../utils/withMyApollo";

const ExploreUsers: React.FC = () => {
  const router = useRouter();

  const [locationQuery, setLocationQuery] = useState(
    router.query.location as string
  );
  const [locationDebouncedQuery, setLocationDebouncedQuery] = useState("");

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
      location: router.query.location as string,
    },
  });

  useEffect(() => {
    if (
      typeof router.query.location === "string" &&
      router.query.location.length > 0
    ) {
      runUsersQuery({
        variables: {
          ...usersVariables!,
          location: router.query.location,
          skip: null,
        },
      });
    }
  }, []);

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
      query: locationDebouncedQuery
        ? {
            location: locationDebouncedQuery,
          }
        : undefined,
    });

    if (!!locationDebouncedQuery) {
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
      <Header>
        <h1>Find users located at</h1>
        <QueryInput
          placeholder="Mars"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
      </Header>
      {meLoading || (usersLoading && !usersData) ? (
        <MySpinner />
      ) : !usersData && usersQueryCalled ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : usersQueryCalled && usersData!.users.users.length === 0 ? (
        <div>There are no users matching this query...</div>
      ) : usersQueryCalled ? (
        <>
          <SearchInfoContainer>
            Found {usersData!.users.users.length} result
            {usersData!.users.users.length !== 1 ? "s" : ""} in{" "}
            {usersData!.users.executionTime
              ? usersData!.users.executionTime / 1000
              : 0}{" "}
            seconds
          </SearchInfoContainer>
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
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(ExploreUsers);

// Styles
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex;
  align-items: center;
  line-height: 0.8;
  margin-bottom: 5px;
`;

const QueryInput = styled.input`
  flex: 1;
  margin-left: 9px;
  border: 0;
  outline: 0;
  border-bottom: 2px dotted var(--main-dark);
  font-size: 16pt;
  color: var(--main-dark);
`;

const SearchInfoContainer = styled.div`
  color: grey;
  font-size: 9pt;
  margin-bottom: 15px;
`;
