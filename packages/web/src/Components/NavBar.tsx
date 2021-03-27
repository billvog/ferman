import { Box, Heading, Link, Text } from "@chakra-ui/layout";
import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    ssr: false,
  });

  return (
    <Flex
      zIndex={2}
      position="sticky"
      top={-1}
      p={4}
      bg="burlywood"
      color="#334963"
    >
      <Flex
        justifyContent="space-between"
        flex={1}
        m="auto"
        align="center"
        maxW="xl"
      >
        <Box>
          <Heading fontFamily="cursive">
            <NextLink href="/">Ferman's</NextLink>
          </Heading>
        </Box>
        <Box>
          {meLoading ? (
            <Spinner />
          ) : meError || !meData?.me ? (
            <>
              <NextLink href="/account/login">
                <Link>Login</Link>
              </NextLink>
              <NextLink href="/account/register">
                <Link ml={4}>Register</Link>
              </NextLink>
            </>
          ) : (
            <Flex>
              <NextLink href="/account/">
                <Flex cursor="pointer" direction="column" textAlign="right">
                  <Text fontWeight="600">{meData.me.username}</Text>
                  <Text fontSize={13} color="indianred">
                    @<Link fontWeight="700">{meData.me.uid}</Link>
                  </Text>
                </Flex>
              </NextLink>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
