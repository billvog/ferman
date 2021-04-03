import { Box, Link, chakra, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { FullCommentFragment, FullUserFragment } from "@ferman/controller";
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
    <Box borderWidth="1px" borderRadius="xl">
      <Box p="1.5" px={2}>
        <Flex justifyContent="space-between" align="center">
          <Flex align="center" color="mainDarkBlue">
            <chakra.span fontWeight="bold" fontSize={13}>
              {comment.user.username}
            </chakra.span>
            <chakra.span fontSize={12} fontWeight="400" ml="1.5">
              @
              <NextLink href={`/user/${comment.user.uid}`}>
                <Link>{comment.user.uid}</Link>
              </NextLink>
            </chakra.span>
          </Flex>
          <chakra.span ml={2} fontSize={11} fontWeight="500" color="gray">
            {moment(parseFloat(comment.createdAt)).fromNow()}
          </chakra.span>
        </Flex>
        <Text fontSize={12} whiteSpace="pre-wrap">
          {richBodyText(comment.text)}
        </Text>
      </Box>
      <CommentActionButtons comment={comment} me={me} onDelete={onDelete} />
    </Box>
  );
};
