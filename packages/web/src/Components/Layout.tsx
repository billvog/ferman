import LayoutStyles from "../css/layout.module.css";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMeQuery } from "@ferman-pkgs/controller";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperSize } from "./Wrapper";
import NProgress from "nprogress";
import { MySpinner } from "./MySpinner";

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
  size = "md",
  isAuth,
  isNotAuth,
}) => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (isAuth || isNotAuth) {
      setOk(false);
    } else {
      setOk(true);
    }
  }, []);

  const { data, loading } = useMeQuery({ ssr: false });
  const router = useRouter();

  useEffect(() => {
    if (ok) {
      return;
    }

    if (isAuth) {
      if (!loading && !data?.me) {
        router.replace("/account/login?next=" + router.pathname);
      } else if (!loading && data?.me) {
        setOk(true);
      }
    }

    if (isNotAuth) {
      if (!loading && data?.me) {
        router.replace("/");
      } else if (!loading && !data?.me) {
        setOk(true);
      }
    }
  }, [data, loading, router]);

  return (
    <div className={LayoutStyles.container}>
      <Head>
        <title>{title || "Ferman – Welcome at Ferman's"}</title>
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
      <NavBar />
      <Wrapper size={size}>{ok ? children : <MySpinner />}</Wrapper>
    </div>
  );
};
