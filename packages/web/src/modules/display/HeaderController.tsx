import { NextPage } from "next";
import Head from "next/head";
import React from "react";

interface HeaderControllerProps {
  title?: string;
  user?: string;
  image?: string;
  additionalKeywords?: string[];
  description?: string;
  type?: "article" | "profile" | "website";
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Ferman, the modern saloon.",
  user,
  image,
  additionalKeywords = [],
  type = "website",
}) => {
  return (
    <Head>
      {title ? <title>{title} – Ferman</title> : <title>Ferman</title>}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`ferman,${additionalKeywords?.map((k) => ` ${k}`)}`}
      />
      <meta name="og:title" content={title || "Ferman"} />
      <meta name="og:type" content={type} />
      {type === "article" ? (
        <>
          <meta name="article:user" content={user || ""} />
        </>
      ) : type === "profile" ? (
        <>
          <meta name="profile:username" content={user || ""} />
        </>
      ) : null}
      <meta name="og:description" content={description} />
      <meta name="og:site_name" content="Ferman" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="og:image"
        content={image || "https://ferman.ga/favicon.ico"}
      />
    </Head>
  );
};
