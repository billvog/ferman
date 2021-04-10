import FormStyles from "../css/form.module.css";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
      query: debouncedQuery ? debouncedQuery : undefined,
    });

    onSubmit({
      query: debouncedQuery,
    });
  }, [debouncedQuery]);

  return (
    <Container>
      <div className={`${FormStyles.formControl}`}>
        <input
          className={FormStyles.input}
          placeholder="Search keywords, @mentions, #hashtags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </Container>
  );
};

// Styles
const Container = styled.div`
  display: flex;
  margin-bottom: 4px;
  line-height: 1.5;
`;
