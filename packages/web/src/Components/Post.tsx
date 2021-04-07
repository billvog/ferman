import PostStyles from "../css/post.module.css";
import React from "react";
import { FullPostFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { PostActionButtons } from "./PostActionButtons";
import NextLink from "next/link";
import moment from "moment";
import { richBodyText } from "../utils/richBodyText";
import styled, { css } from "styled-components";

interface PostProps {
  me: FullUserFragment | null;
  post: FullPostFragment;
  clickable?: boolean;
  onDelete?: () => void;
}

export const Post: React.FC<PostProps> = ({
  post,
  me,
  clickable = false,
  onDelete,
}) => {
  const PostWrapperComponent: any = clickable ? NextLink : React.Fragment;

  return (
    <div className={PostStyles.container}>
      <div className={PostStyles.contentContainer}>
        <div>
          <img
            className={PostStyles.postCreatorAvatar}
            src={`https://www.gravatar.com/avatar/${post.creator.md5}`}
          ></img>
        </div>
        <div style={{ flex: 1 }}>
          <div className={PostStyles.postHeader}>
            <NextLink href={`/user/${post.creator.uid}`}>
              <div className={PostStyles.postCreatorContainer}>
                <CreatorUsernameSpan>
                  {post.creator.username}
                </CreatorUsernameSpan>
                <CreateUidSpan>
                  <span>
                    @<span className="link">{post.creator.uid}</span>
                  </span>
                </CreateUidSpan>
              </div>
            </NextLink>
            <CreatedAtSpan>
              {moment.utc(parseFloat(post.createdAt)).local().fromNow()}
            </CreatedAtSpan>
          </div>
          <PostWrapperComponent href={`/post/${post.id}`}>
            <div
              className={PostStyles.postContent}
              style={{
                cursor: clickable ? "pointer" : "inherit",
              }}
            >
              {richBodyText(post.body)}
            </div>
          </PostWrapperComponent>
        </div>
      </div>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
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

const CreatorUsernameSpan = styled.span`
  color: #444444;
  font-weight: 600;
  font-family: inherit;
  ${AfterMiddleDotSeperator}
`;

const CreateUidSpan = styled.span`
  font-size: 8pt;
  ${AfterMiddleDotSeperator}
`;

const CreatedAtSpan = styled.span`
  font-size: 8pt;
`;
