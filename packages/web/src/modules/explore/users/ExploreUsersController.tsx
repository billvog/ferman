import { useMeQuery, useUsersLazyQuery } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../../../components/ErrorText";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { UserSummaryCard } from "../../../components/UserSummaryCard";
import randomCountry from "random-country-name";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface ExploreUsersControllerProps {}
export const ExploreUsersController: React.FC<ExploreUsersControllerProps> = ({}) => {
  const router = useRouter();
  const { t } = useTypeSafeTranslation();

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
    <div>
      <div className="flex flex-col mb-3 xs:flex-row xs:items-center xs:mb-1 leading-none">
        <h1 className="text-xl font-bold text-primary-600">
          {t("explore.users.find_users_loc_at")}
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
        <ErrorText>{t("errors.500")}</ErrorText>
      ) : usersQueryCalled && usersData!.users.users.length === 0 ? (
        <div className="text-red-500 font-semibold text-sm mt-2">
          {t("explore.users.no_users_location")}
        </div>
      ) : !usersData ? null : usersQueryCalled ? (
        <>
          <div className="xs:mb-4 mb-5 font-semibold text-primary-400 text-xs">
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
            {t("common.load_more")}
          </MyButton>
        </div>
      )}
    </div>
  );
};
