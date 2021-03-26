import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface WrapperProps {
  size?: WrapperSize;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, size = "md" }) => {
  return (
    <Box p={5} mx="auto" w="100%" maxW={size}>
      {children}
    </Box>
  );
};
