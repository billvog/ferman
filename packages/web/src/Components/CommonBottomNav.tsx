import { FullUserFragment } from "@ferman-pkgs/controller";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiFillCompass,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineHome,
} from "react-icons/ai";
import {
  RiSearchFill,
  RiSearchLine,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { MySpinner } from "./MySpinner";

interface CommonBottomNavProps {
  loggedUser: FullUserFragment | null | undefined;
}

export const CommonBottomNav: React.FC<CommonBottomNavProps> = ({
  loggedUser,
}) => {
  const { t } = useTypeSafeTranslation();
  const { route } = useRouter();

  const HomeIcon = route === "/" ? AiFillHome : AiOutlineHome;
  const SearchIcon = route === "/search" ? RiSearchFill : RiSearchLine;
  const ExploreIcon =
    route === "/explore/posts" ? AiFillCompass : AiOutlineCompass;
  const MyAccountIcon = route === "/account" ? RiUser3Fill : RiUser3Line;

  return (
    <div className="sticky bottom-0 p-4 bg-accent-transparent backdrop-filter backdrop-blur w-full">
      <div className="flex flex-row space-x-10 justify-center items-center text-accent">
        <div>
          <Link href="/">
            <HomeIcon size="24px" />
          </Link>
        </div>
        <div>
          <Link href="/search">
            <SearchIcon size="24px" />
          </Link>
        </div>
        <div>
          <Link href="/explore/posts">
            <ExploreIcon size="24px" />
          </Link>
        </div>
        <div>
          {typeof loggedUser === "undefined" ? (
            <MySpinner />
          ) : !loggedUser ? (
            <div></div>
          ) : (
            <Link href="/account">
              <MyAccountIcon size="24px" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
