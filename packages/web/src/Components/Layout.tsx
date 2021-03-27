import { Box, Spinner, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperSize } from "./Wrapper";

interface LayoutProps {
  title?: string;
  size?: WrapperSize;
  // auth options
  isAuth?: boolean;
  isNotAuth?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  size = "md",
  // auth options
  isAuth,
  isNotAuth,
}) => {
  const toast = useToast();
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
        toast({
          title: "Not Authenticated",
          description: "Authentication required to access this page",
          status: "error",
          duration: 5000,
        });
      } else if (!loading && data?.me) {
        setOk(true);
      }
    }

    if (isNotAuth) {
      if (!loading && data?.me) {
        router.replace("/");
        toast({
          title: "Authenticated",
          description:
            "Cannot access this page unless you're not authenticated",
          status: "error",
          duration: 5000,
        });
      } else if (!loading && !data?.me) {
        setOk(true);
      }
    }
  }, [data, loading, router]);

  return (
    <Box>
      <Head>
        <title>{title || "Ferman – Welcome at Ferman's"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Ferman, the modern saloon. Here you can publish small post & share them with the world!"
        />
      </Head>
      <NavBar />
      <Wrapper size={size}>{ok ? children : <Spinner />}</Wrapper>
    </Box>
  );
};
