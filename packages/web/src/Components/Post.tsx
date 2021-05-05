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
      <div className={`flex p-3`}>
        <div>
          <img
            className="w-8 h-8 rounded-xl mr-3"
            src={post.creator.profile?.avatarUrl}
          ></img>
        </div>
        <div style={{ flex: 1 }}>
          <div className="flex items-start justify-between mobile:justify-start mobile:items-center mobile:mb-0 mb-1.5 leading-none text-gray-400 space-x-1.5">
            <NextLink href={`/user/${post.creator.uid}`}>
              <div className="flex flex-col mobile:flex-row mobile:items-center mobile:space-x-1.5 cursor-pointer">
                <div className="text-sm text-gray-700 font-bold">
                  {post.creator.username}
                </div>
                <div className="hidden mobile:block">·</div>
                <div className="text-xs">
                  @<span className="link">{post.creator.uid}</span>
                </div>
              </div>
            </NextLink>
            <div className="hidden mobile:block">·</div>
            <div className="text-2xs leading-normal">
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
