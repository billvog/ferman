import { Box, Link, chakra, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { FullCommentFragment, FullUserFragment } from "../generated/graphql";
import NextLink from "next/link";
import { CommentActionButtons } from "./CommentActionButtons";
import moment from "moment";
import { richBodyText } from "../utils/richBodyText";

interface PostCommentProps {
  me: FullUserFragment | null;
  comment: FullCommentFragment;
  onDelete?: () => any;
}

export const PostComment: React.FC<PostCommentProps> = ({
  me,
  comment,
  onDelete,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="md">
      <Box p={2} px={3}>
        <Flex justifyContent="space-between" align="center">
          <Flex align="center" color="mainDarkBlue">
            <chakra.span fontWeight="bold" fontSize={14}>
              {comment.user.username}
            </chakra.span>
            <chakra.span fontSize={13} fontWeight="400" ml="1.5">
              @
              <NextLink href={`/user/${comment.user.uid}`}>
                <Link>{comment.user.uid}</Link>
              </NextLink>
            </chakra.span>
          </Flex>
          <chakra.span ml={2} fontSize={12}>
            {moment(parseFloat(comment.createdAt)).fromNow()}
          </chakra.span>
        </Flex>
        <Text fontSize={14} whiteSpace="pre-wrap">
          {richBodyText(comment.text)}
        </Text>
      </Box>
      <CommentActionButtons comment={comment} me={me} onDelete={onDelete} />
    </Box>
  );
};
