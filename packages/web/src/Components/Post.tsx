import PostStyles from "../css/post.module.css";
import React from "react";
import { FullPostFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { PostActionButtons } from "./PostActionButtons";
import NextLink from "next/link";
import moment from "moment";
import { richBodyText } from "../utils/richBodyText";
import styled from "styled-components";

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
  const PostWrapperComponent = clickable ? NextLink : React.Fragment;

  return (
    <div className={PostStyles.container}>
      <div className={PostStyles.contentContainer}>
        <div>
          <CreateAvatar
            src={`https://www.gravatar.com/avatar/${post.creator.emailHash}`}
          ></CreateAvatar>
        </div>
        <div>
          <div className={PostStyles.postHeader}>
            <div className={PostStyles.postCreator}>
              <CreatorUsernameSpan>{post.creator.username}</CreatorUsernameSpan>
              <CreateUidSpan>
                <NextLink href={`/user/${post.creator.uid}`}>
                  <span>
                    @<span className="link">{post.creator.uid}</span>
                  </span>
                </NextLink>
              </CreateUidSpan>
              <CreatedAtSpan>
                {moment.utc(parseFloat(post.createdAt)).local().fromNow()}
              </CreatedAtSpan>
            </div>
          </div>
          <PostWrapperComponent href={`/post/${post.id}`}>
            <div className={PostStyles.postContent}>
              {richBodyText(post.body)}
            </div>
          </PostWrapperComponent>
        </div>
      </div>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
    </div>
  );
};

const CreateAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 35%;
  margin-right: 12px;
`;

const CreatorUsernameSpan = styled.span`
  color: #444444;
  font-weight: 600;
  font-family: inherit;
  font-size: 9pt;
  &::after {
    content: "·";
    margin: 0 4px;
    font-weight: 500;
    color: inherit;
  }
`;

const CreateUidSpan = styled.span`
  font-size: inherit;
  &::after {
    content: "·";
    margin: 0 4px;
    font-weight: 500;
  }
`;

const CreatedAtSpan = styled.span`
  font-size: inherit;
`;
