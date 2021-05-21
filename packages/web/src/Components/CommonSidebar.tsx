import { FullUserFragment } from "@ferman-pkgs/controller";
import Link from "next/link";
import React from "react";
import { BiLogIn, BiUserCircle } from "react-icons/bi";
import { useScreenType } from "../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { LanguageSelector } from "./LanguageSelector";
import { MySpinner } from "./MySpinner";

interface CommonSidebarProps {
  loggedUser: FullUserFragment | null | undefined;
}

export const CommonSidebar: React.FC<CommonSidebarProps> = ({ loggedUser }) => {
  const { t } = useTypeSafeTranslation();
  const screenType = useScreenType();

  return (
    <div className="flex sticky top-0 flex-col justify-between items-start space-y-6 h-screen divide-y">
      <div className="flex flex-col justify-center w-full space-y-4 divide-y">
        <div className="p-4 flex flex-col 2cols:flex-row justify-between items-center 2cols:divide-y-0 divide-y 2cols:space-y-0 space-y-4">
          <Link href="/">
            <div className="flex justify-items-start items-center cursor-pointer 2cols:w-full group">
              <img src="/favicon.ico" className="w-9 h-9 2cols:mr-3" />
              {screenType === "2-cols" && (
                <span className="text-3xl font-bold font-cursive text-primary-600 ">
                  Ferman's
                </span>
              )}
            </div>
          </Link>
          <div className="2cols:pt-0 pt-2">
            <LanguageSelector />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6 w-full p-4 group hover:bg-primary-100 transition-colors duration-150">
        {typeof loggedUser === "undefined" ? (
          <div>
            <MySpinner />
          </div>
        ) : loggedUser ? (
          <Link href="/account/">
            <div className="flex flex-row justify-center 2cols:justify-between items-center w-full cursor-pointer">
              {screenType === "2-cols" ? (
                <>
                  <div className="flex flex-row items-center">
                    <div className="mr-2.5">
                      <img
                        src={loggedUser.profile?.avatarUrl}
                        className="w-10 h-10 rounded-35"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-base leading-none text-primary-600 group-hover:underline">
                        {loggedUser.username}
                      </span>
                      <span className="text-sm font-semibold text-primary-450">
                        @{loggedUser.uid}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-accent-hover p-2 rounded-full group-hover:bg-accent-transparent group-hover:text-accent-washed-out">
                      <BiUserCircle />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <img
                    src={loggedUser.profile?.avatarUrl}
                    className="w-10 h-10 rounded-35"
                  />
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="w-full flex justify-around font-semibold space-x-2 text-primary-600">
            <Link href="/account/login">
              <div className="flex items-center cursor-pointer hover:underline">
                <BiLogIn />
                <span className="ml-2">{t("common_sidebar.login")}</span>
              </div>
            </Link>
            <Link href="/account/register">
              <div className="cursor-pointer hover:underline">
                {t("common_sidebar.register")}
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
