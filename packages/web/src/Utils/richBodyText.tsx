import { Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import processString from "react-process-string";
import styled, { css } from "styled-components";

export const richBodyText = (body: string): any => {
  const config = [
    {
      regex: /(\#[a-zA-Z]+\b)(?!;)/gm,
      fn: (key: any, result: any) => (
        <NextLink
          href={`/search?query=${encodeURIComponent(result[0])}`}
          key={key}
        >
          <HashtagText>{result[0]}</HashtagText>
        </NextLink>
      ),
    },
    {
      regex: /@([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])/gi,
      fn: (key: any, result: any) => (
        <NextLink href={`/user/${result[0].substring(1)}`} key={key}>
          <UidText>{result[0]}</UidText>
        </NextLink>
      ),
    },
    {
      regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm,
      fn: (key: any, result: any) => (
        <a href={result[0]} target="_blank" key={key}>
          <UrlText>{result[0]}</UrlText>
        </a>
      ),
    },
  ];

  return <Text>{processString(config)(body)}</Text>;
};

// Styles
const CommonTextStyles = css`
  font-family: inherit;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const HashtagText = styled.span`
  color: #2f75f7;
  ${CommonTextStyles}
`;

const UidText = styled.span`
  color: brown;
  ${CommonTextStyles}
`;

const UrlText = styled.span`
  color: #0d6efd;
  ${CommonTextStyles}
`;
