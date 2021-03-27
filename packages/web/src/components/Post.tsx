import { Box, Link, Heading, chakra, Text, Divider } from "@chakra-ui/react";
import React from "react";
import { FullPostFragment, FullUserFragment } from "../generated/graphql";
import { PostActionButtons } from "./PostActionButtons";
import NextLink from "next/link";
import moment from "moment";
import { richBodyText } from "../Utils/richBodyText";

interface PostProps {
  me: FullUserFragment | null;
  post: FullPostFragment;
  onDelete?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, me, onDelete }) => {
  return (
    <Box mb={6} borderWidth="1px" borderRadius="xl">
      <Box p={4} pb={3}>
        <NextLink href={`/post/${post.id}`}>
          <Link>
            <Heading fontSize={16} color="mainDarkBlue">
              {post.title}
            </Heading>
          </Link>
        </NextLink>
        <Text mt={1} fontSize={14} whiteSpace="pre-wrap">
          {richBodyText(post.body)}
        </Text>
        <Text mt={2} fontSize="11" color="grey">
          <chakra.span fontWeight="700">{post.creator.username}</chakra.span> ·{" "}
          <NextLink href={`/user/${post.creator.uid}`}>
            <chakra.span>
              @<Link>{post.creator.uid}</Link>
            </chakra.span>
          </NextLink>{" "}
          ·{" "}
          <chakra.span>
            {moment(parseFloat(post.createdAt)).fromNow()}
          </chakra.span>
        </Text>
      </Box>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
    </Box>
  );
};
