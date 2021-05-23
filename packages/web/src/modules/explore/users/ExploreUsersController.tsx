import { FullUserFragment, useUsersLazyQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import randomCountry from "random-country-name";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { UserSummaryCard } from "../../../components/UserSummaryCard";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface ExploreUsersControllerProps {
  loggedUser: FullUserFragment | null | undefined;
}

export const ExploreUsersController: React.FC<ExploreUsersControllerProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

  const [locationDebouncedQuery, setLocationDebouncedQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

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
    if (router.query.location) {
      setLocationQuery(router.query.location as string);
    } else {
      setLocationQuery(randomCountry.random() as string);
    }
  }, [router.query.location]);

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
    <div>
      <div className="flex flex-col p-3 pb-0 1cols:flex-row 1cols:items-center 1cols:mb-1 leading-none">
        <h1 className="text-xl font-bold text-primary-600">
          {t("explore.users.find_users_loc_at")}
        </h1>
        <input
          className="flex-1 1cols:ml-2.5 outline-none border-b-2 border-dotted border-primary-450 text-xl text-primary-600 font-semibold"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
      </div>
      {typeof loggedUser === "undefined" || (usersLoading && !usersData) ? (
        <div className="p-4">
          <MySpinner />
        </div>
      ) : !usersData && usersQueryCalled ? (
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : usersQueryCalled && usersData!.users.users.length === 0 ? (
        <div className="text-red-500 font-semibold text-sm p-3">
          {t("explore.users.no_users_location")}
        </div>
      ) : !usersData ? null : usersQueryCalled ? (
        <>
          <div className="p-3 pt-0 font-semibold text-primary-400 text-vs">
            {usersData.users.count !== 1 ? (
              <div>
                {t("common.found_x_results")
                  .replace("%count%", usersData.users.count.toString())
                  .replace(
                    "%seconds%",
                    Number(usersData?.users.executionTime / 1000).toString()
                  )}
              </div>
            ) : (
              <div>
                {t("common.found_one_result").replace(
                  "%seconds%",
                  Number(usersData?.users.executionTime / 1000).toString()
                )}
              </div>
            )}
          </div>
          <div className="divide-y border-t border-b">
            {usersData!.users.users.map((user) => (
              <UserSummaryCard me={loggedUser} user={user} key={user.id} />
            ))}
          </div>
        </>
      ) : null}
      {usersData?.users.users && usersData?.users.hasMore && (
        <div className="flex justify-center p-5">
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
            {t("common.load_more")}
          </MyButton>
        </div>
      )}
    </div>
  );
};
