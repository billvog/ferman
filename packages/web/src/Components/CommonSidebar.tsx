import { FullUserFragment } from "@ferman-pkgs/controller";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { BiUserCircle } from "react-icons/bi";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useNavIcons } from "../shared-hooks/useNavIcons";
import { useScreenType } from "../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { MySpinner } from "./MySpinner";

interface SidebarItemProps {
  onClick: () => any;
  text: string;
  icon: JSX.Element;
}

const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const screenType = useScreenType();
  return (
    <div
      className="flex flex-row justify-center 2cols:justify-start items-center p-4 cursor-pointer transition duration-150 text-primary-600 hover:bg-primary-50"
      title={props.text}
      onClick={props.onClick}
    >
      <span className="mr-0 2cols:mr-3">{props.icon}</span>
      {screenType === "2-cols" && <span>{props.text}</span>}
    </div>
  );
};

interface UserActionProps {
  onClick: () => any;
  icon: JSX.Element;
}

const UserAction: React.FC<UserActionProps> = (props) => {
  return (
    <div className="flex-1 flex justify-center items-center p-2">
      <div
        className="hover:bg-accent-transparent cursor-pointer transition-colors text-accent p-2 rounded-full"
        onClick={props.onClick}
      >
        {props.icon}
      </div>
    </div>
  );
};

interface CommonSidebarProps {}

export const CommonSidebar: React.FC<CommonSidebarProps> = ({}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const screenType = useScreenType();
  const NavIcons = useNavIcons();

  const { me } = useContext(AuthContext);

  return (
    <div className="flex sticky top-0 flex-col justify-between items-start space-y-6 h-screen divide-y">
      <div className="flex flex-col justify-center w-full divide-y border-b">
        <div className="p-4 flex items-center">
          <Link href="/">
            <div className="flex justify-center items-center cursor-pointer w-full group">
              <img src="/favicon.ico" className="w-9 h-9 2cols:mr-3" />
              {screenType === "2-cols" && (
                <span className="text-3xl font-bold font-cursive text-primary-600 ">
                  Ferman's
                </span>
              )}
            </div>
          </Link>
        </div>
        <SidebarItem
          onClick={() => router.push("/")}
          icon={<NavIcons.HomeIcon size="24px" />}
          text={t("common_sidebar.home")}
          key="home-item"
        />
        <SidebarItem
          onClick={() => router.push("/search")}
          icon={<NavIcons.SearchIcon size="24px" />}
          text={t("common_sidebar.search")}
          key="search-item"
        />
        {me && (
          <>
            <SidebarItem
              onClick={() => {
                router.push(
                  {
                    pathname: router.pathname,
                    query: router.query,
                  },
                  "/post"
                );
              }}
              icon={<NavIcons.PostIcon size="24px" />}
              text={t("common_sidebar.post")}
              key="post-item"
            />
            <SidebarItem
              onClick={() => router.push("/explore/posts")}
              icon={<NavIcons.ExploreIcon size="24px" />}
              text={t("common_sidebar.explore")}
              key="explore-item"
            />
          </>
        )}
      </div>
      <div className="w-full divide-y">
        {typeof me !== "undefined" && me && (
          <div className="flex 2cols:flex-row flex-col divide-y 2cols:divide-y-0 2cols:space-x-2 justify-center">
            <UserAction
              icon={
                <div className="relative">
                  <div className="relative p-0.5">
                    <NavIcons.ChatIcon size="20px" />
                    {me.hasUnreadMessage && (
                      <div className="absolute bottom-0 right-0">
                        <div className="w-2 h-2 rounded-full bg-primary-600 ring-2 ring-primary-50" />
                      </div>
                    )}
                  </div>
                </div>
              }
              onClick={() => router.push("/chat/my")}
              key="chat-action"
            />
          </div>
        )}
        <div
          className="flex flex-col items-center space-y-6 w-full p-4 group hover:bg-primary-100 transition-colors duration-150 cursor-pointer"
          onClick={() =>
            me ? router.push("/account") : router.push("/account/login")
          }
        >
          {typeof me === "undefined" ? (
            <MySpinner />
          ) : me ? (
            <>
              <div className="flex flex-row justify-center 2cols:justify-between items-center w-full">
                {screenType === "2-cols" ? (
                  <>
                    <div className="flex flex-row items-center">
                      <div className="mr-2.5">
                        <img
                          src={me.profile.avatarUrl}
                          className="w-10 h-10 rounded-35"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-base leading-none text-primary-600 group-hover:underline">
                          {me.username}
                        </span>
                        <span className="text-sm font-semibold text-primary-450">
                          @{me.uid}
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
                      src={me.profile?.avatarUrl}
                      className="w-10 h-10 rounded-35"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="font-semibold text-primary-600 group-hover:underline">
              <div className="flex items-center">
                <NavIcons.LoginIcon size="24px" />
                {screenType === "2-cols" && (
                  <span className="ml-2">{t("common_sidebar.login")}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
