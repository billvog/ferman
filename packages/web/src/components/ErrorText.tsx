import { Heading } from "@chakra-ui/layout";
import React from "react";

interface ErrorTextProps {}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
    <Heading
      bg="indianred"
      p={2}
      px={3}
      borderRadius="sm"
      color="white"
      fontSize={16}
    >
      {children}
    </Heading>
  );
};
