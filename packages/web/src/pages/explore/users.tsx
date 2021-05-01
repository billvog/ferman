import { useMeQuery, useUsersQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React from "react";
import { ErrorText } from "../../components/ErrorText";
import { Layout } from "../../components/Layout";
import { MySpinner } from "../../components/MySpinner";
import { UserCard } from "../../components/UserCard";
import { withMyApollo } from "../../utils/withMyApollo";

const ExploreUsers: React.FC = () => {
  const router = useRouter();

  const { data: meData, loading: meLoading } = useMeQuery({
    ssr: false,
  });

  const {
    data: usersData,
    loading: usersLoading,
    fetchMore: fetchMoreUsers,
  } = useUsersQuery({
    skip: typeof router.query.location !== "string",
    variables: {
      limit: 15,
      skip: 0,
      location: router.query.location as string,
    },
  });

  return (
    <Layout
      title={`Find users in ${router.query.location} – Ferman`}
      description={`Find users located at ${router.query.location}, find new people at your location and make new friends.s`}
    >
      <h1>
        Find users in{" "}
        <span
          style={{
            borderBottom: "2px dotted currentColor",
          }}
        >
          {router.query.location}
        </span>
      </h1>
      {meLoading || (usersLoading && !usersData) ? (
        <MySpinner />
      ) : !usersData ? (
        <ErrorText>Internal server error (500)</ErrorText>
      ) : usersData.users.users.length === 0 ? (
        <div>There are no users matching this query...</div>
      ) : (
        <>
          {usersData.users.users.map((user) => (
            <UserCard
              me={meData?.me || null}
              user={user}
              key={user.id}
              marginBottom={10}
              minimal
            />
          ))}
        </>
      )}
    </Layout>
  );
};

export default withMyApollo({
  ssr: true,
})(ExploreUsers);
