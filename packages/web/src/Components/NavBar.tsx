import NavbarStyles from "../css/navbar.module.css";
import { Spinner } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "@ferman-pkgs/controller";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    ssr: false,
  });

  return (
    <div className={NavbarStyles.navbar}>
      <div className={NavbarStyles.container}>
        <div className={NavbarStyles.leftWrapper}>
          <NextLink href="/">
            <div className={NavbarStyles.heading}>Ferman's</div>
          </NextLink>
        </div>
        <div className={NavbarStyles.rightWrapper}>
          {meLoading ? (
            <Spinner />
          ) : meError || !meData?.me ? (
            <div className={NavbarStyles.notLoggedInBox}>
              <NextLink href="/account/login">
                <span className="link">Login</span>
              </NextLink>
              <NextLink href="/account/register">
                <span className="link" style={{ marginLeft: 12 }}>
                  Register
                </span>
              </NextLink>
            </div>
          ) : (
            <div className={NavbarStyles.loggedInBox}>
              <NextLink href="/account/">
                <div className={NavbarStyles.UsernameWrapper}>
                  <span className={NavbarStyles.username}>
                    {meData.me.username}
                  </span>
                  <span className={NavbarStyles.uid}>
                    @
                    <span className="link" style={{ fontWeight: 600 }}>
                      {meData.me.uid}
                    </span>
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
