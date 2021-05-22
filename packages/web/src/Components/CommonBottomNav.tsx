import { FullUserFragment } from "@ferman-pkgs/controller";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useNavIcons } from "../shared-hooks/useNavIcons";
import { MySpinner } from "./MySpinner";

interface NavbarItemProps {
  onClick: () => any;
  icon: JSX.Element;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  return (
    <div
      className="flex flex-row justify-center items-center"
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  );
};

interface CommonBottomNavProps {
  loggedUser: FullUserFragment | null | undefined;
}

export const CommonBottomNav: React.FC<CommonBottomNavProps> = ({
  loggedUser,
}) => {
  const router = useRouter();
  const NavIcons = useNavIcons();

  return (
    <div className="sticky z-20 bottom-0 p-4 bg-accent-transparent backdrop-filter backdrop-blur w-full">
      <div className="flex flex-row space-x-10 justify-center items-center text-accent">
        <NavbarItem
          onClick={() => router.push("/")}
          icon={<NavIcons.HomeIcon size="24px" />}
        />
        <NavbarItem
          onClick={() => router.push("/search")}
          icon={<NavIcons.SearchIcon size="24px" />}
        />
        <NavbarItem
          onClick={() => router.push("/post")}
          icon={<NavIcons.PostIcon size="24px" />}
        />
        <NavbarItem
          onClick={() => router.push("/explore/posts")}
          icon={<NavIcons.ExploreIcon size="24px" />}
        />
        <div>
          {typeof loggedUser === "undefined" ? (
            <MySpinner />
          ) : !loggedUser ? (
            <div></div>
          ) : (
            <Link href="/account">
              <NavIcons.MyAccountIcon size="24px" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
