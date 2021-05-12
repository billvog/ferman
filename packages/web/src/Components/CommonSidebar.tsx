import { FullUserFragment } from "@ferman-pkgs/controller";
import Link from "next/link";
import React from "react";
import { CgMoreAlt } from "react-icons/cg";
import { LanguageSelector } from "./LanguageSelector";
import { MySpinner } from "./MySpinner";

interface CommonSidebarProps {
  loggedUser: FullUserFragment | null | undefined;
}

export const CommonSidebar: React.FC<CommonSidebarProps> = ({ loggedUser }) => {
  return (
    <div className="flex flex-col justify-between w-full items-start space-y-6 h-screen p-4">
      <div className="flex justify-center items-center w-full">
        <div>
          <Link href="/">
            <div className="flex justify-center items-center cursor-pointer w-full">
              <img src="/favicon.ico" className="w-9 h-9 mr-3" />
              <span className="text-4xl font-bold font-cursive text-primary-600 ">
                Ferman's
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6 w-full">
        {typeof loggedUser === "undefined" ? (
          <div>
            <MySpinner />
          </div>
        ) : loggedUser ? (
          <Link href="/account/">
            <div className="flex flex-row justify-between items-center w-full group cursor-pointer">
              <div className="flex flex-row items-center">
                <div className="mr-2.5">
                  <img
                    src={loggedUser.profile?.avatarUrl}
                    className="w-10 h-10 rounded-35"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base leading-tight text-primary-700 group-hover:underline">
                    {loggedUser.username}
                  </span>
                  <span className="text-sm font-semibold text-accent-hover">
                    @{loggedUser.uid}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-primary-450 p-2 rounded-full group-hover:bg-primary-200 group-hover:text-primary-400">
                  <CgMoreAlt />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div>
            <div className="font-semibold space-x-2 text-primary-600">
              <Link href="/account/login">
                <span className="cursor-pointer hover:underline">Login</span>
              </Link>
              <Link href="/account/register">
                <span className="cursor-pointer hover:underline">Register</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
