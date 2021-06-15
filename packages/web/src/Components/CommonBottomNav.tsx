import { FullUserFragment } from "@ferman-pkgs/controller";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AuthContext } from "../modules/auth/AuthProvider";
import { useNavIcons } from "../shared-hooks/useNavIcons";

interface NavbarItemProps {
  onClick: () => any;
  icon: JSX.Element;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  return (
    <div
      className="flex-1 flex flex-row justify-center items-center"
      onClick={props.onClick}
    >
      {props.icon}
    </div>
  );
};

interface CommonBottomNavProps {}

export const CommonBottomNav: React.FC<CommonBottomNavProps> = ({}) => {
  const router = useRouter();
  const NavIcons = useNavIcons();

  const { me } = useContext(AuthContext);

  return (
    <div className="sticky z-20 bottom-0 px-5 py-4 bg-accent-transparent backdrop-filter backdrop-blur w-full">
      <div className="flex flex-row justify-center items-center text-accent">
        <NavbarItem
          onClick={() => router.push("/")}
          icon={<NavIcons.HomeIcon size="24px" />}
        />
        <NavbarItem
          onClick={() => router.push("/search")}
          icon={<NavIcons.SearchIcon size="24px" />}
        />
        {me ? (
          <>
            <NavbarItem
              onClick={() => router.push("/post")}
              icon={<NavIcons.PostIcon size="24px" />}
            />
            <NavbarItem
              onClick={() => router.push("/explore/posts")}
              icon={<NavIcons.ExploreIcon size="24px" />}
            />
          </>
        ) : (
          <>
            <NavbarItem
              onClick={() => router.push("/account/login")}
              icon={<NavIcons.LoginIcon size="24px" />}
            />
          </>
        )}
      </div>
    </div>
  );
};
