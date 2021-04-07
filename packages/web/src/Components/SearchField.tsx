import FormStyles from "../css/form.module.css";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { MyIconButton } from "./MyIconButton";

interface SearchFieldProps {
  initialValue?: string;
  isLoading?: boolean;
  onSubmit: (values: { searchQuery: string }) => any;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  initialValue = "",
  onSubmit,
  isLoading,
}) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      searchQuery: initialValue,
    },
    onSubmit: (values) => {
      if (router.pathname === "/search") {
        router.replace({
          query: !!formik.values.searchQuery
            ? {
                query: formik.values.searchQuery,
              }
            : {},
        });
      }

      return onSubmit(values);
    },
  });

  useEffect(() => {
    if (
      router.query.query &&
      router.query.query !== formik.values.searchQuery
    ) {
      formik.setFieldValue("searchQuery", router.query.query);
      formik.submitForm();
    }
  }, [router.query.query]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <div className={`${FormStyles.formControl}`}>
          <input
            className={FormStyles.input}
            name="searchQuery"
            placeholder="Search keywords, @mentions"
            value={formik.values.searchQuery}
            onChange={formik.handleChange}
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              height: 40,
            }}
          />
        </div>
        <MyIconButton
          aria-label="search"
          icon={<SearchIcon />}
          style={{
            backgroundColor: "indianred",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: 40,
            width: 40,
          }}
          isLoading={
            typeof isLoading === "boolean" ? isLoading : formik.isSubmitting
          }
          type="submit"
        />
      </Container>
    </form>
  );
};

// Styles
const Container = styled.div`
  display: flex;
  margin-bottom: 4px;
  line-height: 1.5;
`;
