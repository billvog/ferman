import CommentStyles from "../css/comment.module.css";
import { Box, Link, chakra, Text, Flex } from "@chakra-ui/react";
import React from "react";
import { FullCommentFragment, FullUserFragment } from "@ferman-pkgs/controller";
import NextLink from "next/link";
import { CommentActionButtons } from "./CommentActionButtons";
import moment from "moment";
import { richBodyText } from "../utils/richBodyText";
import styled, { css } from "styled-components";

interface PostCommentProps {
  me: FullUserFragment | null;
  comment: FullCommentFragment;
  onDelete?: () => any;
  clickable?: boolean;
  // style options
  marginBottom?: number;
}

export const PostComment: React.FC<PostCommentProps> = ({
  me,
  comment,
  onDelete,
  clickable,
  // style options
  marginBottom,
}) => {
  const CommentWrapperComponent: any = clickable ? NextLink : React.Fragment;

  return (
    <div className={CommentStyles.container} style={{ marginBottom }}>
      <div className={CommentStyles.contentContainer}>
        <div className={CommentStyles.topSection}>
          <div className={CommentStyles.leftSection}>
            <NextLink href={`/user/${comment.user.uid}`}>
              <CreatorContainer>
                <CreatorUsernameSpan>
                  {comment.user.username}
                </CreatorUsernameSpan>
                <CreateUidSpan>
                  @<div className="link">{comment.user.uid}</div>
                </CreateUidSpan>
              </CreatorContainer>
            </NextLink>
          </div>
          <CreatedAtSpan>
            {moment.utc(parseFloat(comment.createdAt)).local().fromNow()}
          </CreatedAtSpan>
        </div>
        <CommentWrapperComponent
          href={`/post/${comment.postId}/comment/${comment.id}`}
        >
          <div
            className={CommentStyles.commentBodyWrapper}
            style={{
              cursor: clickable ? "pointer" : "inherit",
            }}
          >
            {richBodyText(comment.text)}
          </div>
        </CommentWrapperComponent>
      </div>
      <CommentActionButtons comment={comment} me={me} onDelete={onDelete} />
    </div>
  );
};

const AfterMiddleDotSeperator = css`
  &::after {
    content: "·";
    margin: 0 4px;
    font-weight: 500;
    color: grey;
  }
`;

const CreatorContainer = styled.div`
  cursor: pointer;
  display: flex;
`;

const CreatorUsernameSpan = styled.span`
  color: #444444;
  font-weight: 600;
  font-family: inherit;
  font-size: 9pt;
  ${AfterMiddleDotSeperator}
`;

const CreateUidSpan = styled.span`
  font-size: 8pt;
  display: flex;
  color: grey;
  flex-direction: row;
`;

const CreatedAtSpan = styled.span`
  font-size: 8pt;
  color: grey;
`;
