import NextLink from "next/link";
import processString from "react-process-string";

export const useRichBodyText = (body: string): any => {
  const config = [
    {
      regex: /(\#[a-zA-Z]+\b)(?!;)/gm,
      fn: (key: any, result: any) => (
        <NextLink
          href={`/search?query=${encodeURIComponent(result[0])}`}
          key={key}
        >
          <span className="font-bold text-indigo-500 cursor-pointer hover:underline">
            {result[0]}
          </span>
        </NextLink>
      ),
    },
    {
      regex: /@([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])/gi,
      fn: (key: any, result: any) => (
        <NextLink href={`/user/${result[0].substring(1)}`} key={key}>
          <span className="text-accent font-bold cursor-pointer hover:underline">
            {result[0]}
          </span>
        </NextLink>
      ),
    },
    {
      regex: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm,
      fn: (key: any, result: any) => (
        <a
          href={result[0]}
          target="_blank"
          key={key}
          className="cursor-pointer text-blue-600 hover:underline"
        >
          {result[0]}
        </a>
      ),
    },
  ];

  return <div>{processString(config)(body)}</div>;
};
