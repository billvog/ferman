import FormStyles from "../css/form.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface SearchFieldProps {
  initialValue?: string;
  onSubmit: (values: { query: string }) => any;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  initialValue = "",
  onSubmit,
}) => {
  const router = useRouter();

  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (router.query.query && router.query.query !== query) {
      setQuery(router.query.query as string);
    }
  }, [router.query.query]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    router.replace({
      query: debouncedQuery
        ? {
            query: debouncedQuery,
          }
        : undefined,
    });

    onSubmit({
      query: debouncedQuery,
    });
  }, [debouncedQuery]);

  return (
    <div className="flex leading-tight">
      <div className="flex-1 mb-1">
        <input
          className="bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-75 border-none rounded-xl w-full text-sm leading-6 focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search keywords, @mentions, #hashtags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
