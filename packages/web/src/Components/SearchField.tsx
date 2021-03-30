import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
      <Flex mb={4}>
        <Input
          name="searchQuery"
          borderRightRadius={0}
          placeholder="Search keywords, @mentions"
          value={formik.values.searchQuery}
          onChange={formik.handleChange}
        />
        <IconButton
          aria-label="search"
          icon={<SearchIcon />}
          fontSize={13}
          colorScheme=""
          bg="brown"
          borderLeftRadius={0}
          borderLeftWidth={0}
          isLoading={
            typeof isLoading === "boolean" ? isLoading : formik.isSubmitting
          }
          type="submit"
        />
      </Flex>
    </form>
  );
};
