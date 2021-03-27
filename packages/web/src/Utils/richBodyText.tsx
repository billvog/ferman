import { Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import processString from "react-process-string";

export const richBodyText = (body: string): any => {
  const config = [
    {
      regex: /\W(\#[a-zA-Z]+\b)(?!;)/gm,
      fn: (key: any, result: any) => (
        <NextLink
          href={`/search?query=${encodeURIComponent(result[0])}`}
          key={key}
        >
          <Link color="cornflowerblue" fontWeight="600">
            {result[0]}
          </Link>
        </NextLink>
      ),
    },
    {
      regex: /@([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])/gi,
      fn: (key: any, result: any) => (
        <NextLink href={`/user/${result[0].substring(1)}`} key={key}>
          <Link color="brown" fontWeight="600">
            {result[0]}
          </Link>
        </NextLink>
      ),
    },
    {
      regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm,
      fn: (key: any, result: any) => (
        <a href={result[0]} target="_blank" key={key}>
          <Link color="lightseagreen" fontWeight="600">
            {result[0]}
          </Link>
        </a>
      ),
    },
  ];

  return <Text>{processString(config)(body)}</Text>;
};
