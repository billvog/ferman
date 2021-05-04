import React from "react";
import { FullPostFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { PostActionButtons } from "./PostActionButtons";
import NextLink from "next/link";
import moment from "moment";
import { richBodyText } from "../utils/richBodyText";

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
    <div className="mb-2 border border-gray-200 rounded-xl">
      <div className={`flex p-3 pb-1`}>
        <div>
          <img
            className="w-8 h-8 rounded-xl mr-3"
            src={`https://www.gravatar.com/avatar/${post.creator.md5}`}
          ></img>
        </div>
        <div style={{ flex: 1 }}>
          <div className="flex items-center leading-normal text-gray-400 space-x-1.5">
            <NextLink href={`/user/${post.creator.uid}`}>
              <div className="flex items-center leading-normal space-x-1.5 cursor-pointer">
                <div className="text-sm text-gray-700 font-bold">
                  {post.creator.username}
                </div>
                <div>·</div>
                <div className="text-xs">
                  @<span className="link">{post.creator.uid}</span>
                </div>
              </div>
            </NextLink>
            <div>·</div>
            <div className="text-xs">
              {moment.utc(parseFloat(post.createdAt)).local().fromNow()}
            </div>
          </div>
          <PostWrapperComponent href={`/post/${post.id}`}>
            <div
              className={`text-xs whitespace-pre-wrap break-words ${
                clickable ? "cursor-pointer" : "cursor-default"
              }`}
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
