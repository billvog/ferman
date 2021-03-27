import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, IconButton } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

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
  return (
    <Formik initialValues={{ searchQuery: initialValue }} onSubmit={onSubmit}>
      {({ values, handleChange, isSubmitting }) => (
        <Form>
          <Flex mb={4}>
            <Input
              name="searchQuery"
              borderRightRadius={0}
              placeholder="Search keywords, @mentions"
              value={values.searchQuery}
              onChange={(e) => {
                handleChange(e);
                if (router.pathname === "/search") {
                  router.replace({
                    query: !!e.currentTarget.value
                      ? {
                          query: e.currentTarget.value,
                        }
                      : {},
                  });
                }
              }}
            />
            <IconButton
              aria-label="search"
              icon={<SearchIcon />}
              fontSize={15}
              colorScheme=""
              bg="brown"
              borderLeftRadius={0}
              borderLeftWidth={0}
              isLoading={
                typeof isLoading === "boolean" ? isLoading : isSubmitting
              }
              type="submit"
            />
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
