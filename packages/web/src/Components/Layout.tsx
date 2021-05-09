import LayoutStyles from "../css/layout.module.css";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperSize } from "./Wrapper";
import NProgress from "nprogress";
import { isServer } from "../utils/isServer";
import { useTranslation } from "react-i18next";
import { AuthManager } from "./AuthManager";
import { SidebarLayout } from "./SidebarLayout";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface LayoutProps {
  title?: string;
  size?: WrapperSize;
  isAuth?: boolean;
  isNotAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  size = "xl",
  isAuth,
  isNotAuth,
}) => {
  const { i18n } = useTranslation();

  return (
    <div className={LayoutStyles.container}>
      <Head>
        <title>{i18n.isInitialized && !isServer() ? title : "Ferman"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Ferman, the modern saloon. Here you can publish small post & share them with the world!"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      {/* <NavBar /> */}
      <div className="flex flex-col items-center w-full">
        <AuthManager RequireLoggedIn={isAuth} RequireNotLoggedIn={isNotAuth}>
          {(user) => (
            <SidebarLayout loggedUser={user}>{children}</SidebarLayout>
          )}
        </AuthManager>
      </div>
    </div>
  );
};
