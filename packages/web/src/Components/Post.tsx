import React from "react";
import { FullPostFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { PostActionButtons } from "./PostActionButtons";
import moment from "moment";
import { richBodyText } from "../utils/richBodyText";

interface PostProps {
  me: FullUserFragment | null;
  post: FullPostFragment;
  onDelete?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, me, onDelete }) => {
  return (
    <div className="mb-2 border border-gray-200 rounded-xl">
      <div className={`flex p-3`}>
        <div>
          <img
            className="w-8 h-8 rounded-35 mr-3"
            src={post.creator.profile?.avatarUrl}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mobile:justify-start mobile:items-center mobile:mb-0 mb-1.5 leading-none text-gray-400 space-x-1.5">
            <div className="group flex flex-col mobile:flex-row mobile:items-center mobile:space-x-1.5 cursor-pointer">
              <div className="group-hover:underline text-sm text-gray-700 font-bold">
                {post.creator.username}
              </div>
              <div className="text-xs">@{post.creator.uid}</div>
            </div>
            <div className="hidden mobile:block">·</div>
            <div className="text-xs leading-normal">
              {moment(parseFloat(post.createdAt)).local().fromNow()}
            </div>
          </div>
          <div className={`text-xs whitespace-pre-wrap break-words truncate`}>
            {richBodyText(post.body)}
          </div>
        </div>
      </div>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
    </div>
  );
};
