import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "@ferman-pkgs/controller";
import { MySpinner } from "./MySpinner";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    ssr: false,
  });

  return (
    <div className="flex z-10 sticky p-4 text-gray-800 bg-primary-50">
      <div className="flex justify-between flex-1 m-auto items-center max-w-xl">
        <div>
          <NextLink href="/">
            <div className="text-4xl font-bold font-cursive text-secondary-hover cursor-pointer">
              Ferman's
            </div>
          </NextLink>
        </div>
        <div>
          {meLoading ? (
            <MySpinner />
          ) : meError || !meData?.me ? (
            <div className="font-semibold space-x-2 text-gray-700">
              <NextLink href="/account/login">
                <span className="link">Login</span>
              </NextLink>
              <NextLink href="/account/register">
                <span className="link">Register</span>
              </NextLink>
            </div>
          ) : (
            <div className="flex">
              <NextLink href="/account/">
                <div className="flex flex-col text-right cursor-pointer">
                  <span className="font-bold text-base leading-tight text-gray-700">
                    {meData.me.username}
                  </span>
                  <span className="text-sm font-semibold text-accent-washed-out">
                    @<span className="link">{meData.me.uid}</span>
                  </span>
                </div>
              </NextLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
