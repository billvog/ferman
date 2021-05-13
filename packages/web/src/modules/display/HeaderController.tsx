import { NextPage } from "next";
import Head from "next/head";
import React from "react";

interface HeaderControllerProps {
  title?: string;
  author?: {
    name: string;
    avatar: string;
  };
  additionalKeywords?: string[];
  description?: string;
  type?: "article" | "comment" | "profile" | "website";
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Ferman, the modern saloon.",
  author,
  additionalKeywords = [],
  type = "website",
}) => {
  return (
    <Head>
      {title ? <title>{title} – Ferman</title> : <title>Ferman</title>}
      <meta name="description" content={description} />
      {author ? <meta name="author" content={author.name} /> : ""}
      <meta
        name="keywords"
        content={`ferman,${additionalKeywords?.map((k) => ` ${k}`)}`}
      />
      <meta name="og:title" content={title || "Ferman"} />
      <meta name="og:type" content={type} />
      {author ? <meta name="article:creator" content={author.name} /> : ""}
      <meta name="og:description" content={description} />
      <meta name="og:site_name" content="Ferman" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="og:image"
        content={author?.avatar || "https://ferman.ga/favicon.ico"}
      />
    </Head>
  );
};
