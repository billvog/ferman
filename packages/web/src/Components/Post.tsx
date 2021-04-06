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
  onDelete?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, me, onDelete }) => {
  return (
    <div className={PostStyles.container}>
      <div className={PostStyles.contentContainer}>
        <div className={PostStyles.postHeader}>
          <NextLink href={`/post/${post.id}`}>
            <div className={`link ${PostStyles.postTitle}`}>{post.title}</div>
          </NextLink>
          <div className={PostStyles.postCreator}>
            <CreatorUsernameSpan>{post.creator.username}</CreatorUsernameSpan> ·{" "}
            <NextLink href={`/user/${post.creator.uid}`}>
              <span>
                @<span className="link">{post.creator.uid}</span>
              </span>
            </NextLink>{" "}
            · <span>{moment(parseFloat(post.createdAt)).fromNow()}</span>
          </div>
        </div>
        <div className={PostStyles.postContent}>{richBodyText(post.body)}</div>
      </div>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
    </div>
  );
};

const CreatorUsernameSpan = styled.span`
  font-weight: 600;
  font-family: inherit;
`;
