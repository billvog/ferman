import LayoutStyles from "../css/layout.module.css";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import { WrapperSize } from "./Wrapper";
import NProgress from "nprogress";
import { isServer } from "../utils/isServer";
import { useTranslation } from "react-i18next";
import { AuthManager } from "./AuthManager";
import { MainLayout } from "./MainLayout";
import { PageHeader } from "./PageHeader";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface LayoutProps {
  pageTitle?: string;
  title: string;
  size?: WrapperSize;
  isAuth?: boolean;
  isNotAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  pageTitle = "",
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
          content="Ferman, the modern saloon. Chat and take a drink."
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      <div className="flex flex-col items-center w-full">
        <AuthManager RequireLoggedIn={isAuth} RequireNotLoggedIn={isNotAuth}>
          {(user) => (
            <MainLayout loggedUser={user}>
              <div>
                <PageHeader title={pageTitle || ""} />
                <div className="p-4">{children}</div>
              </div>
            </MainLayout>
          )}
        </AuthManager>
      </div>
    </div>
  );
};
