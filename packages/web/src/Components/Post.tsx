import React from "react";
import { FullPostFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { PostActionButtons } from "./PostActionButtons";
import moment from "moment";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import Link from "next/link";

interface PostProps {
  me: FullUserFragment | null;
  post: FullPostFragment;
  onDelete?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, me, onDelete }) => {
  return (
    <div>
      <div className="flex p-4 pb-0">
        <div className="min-w-max">
          <img
            className="w-8 h-8 rounded-35 mr-3"
            src={post.creator.profile?.avatarUrl}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-start justify-between fullscreen:justify-start fullscreen:items-center fullscreen:mb-0 mb-1.5 leading-none text-primary-450 space-x-1.5">
            <Link href={`/user/${post.creator.uid}`}>
              <div className="group flex flex-col fullscreen:flex-row fullscreen:items-center fullscreen:space-x-1.5 cursor-pointer">
                <div className="group-hover:underline text-sm text-primary-700 font-bold">
                  {post.creator.username}
                </div>
                <div className="text-xs">@{post.creator.uid}</div>
              </div>
            </Link>
            <div className="hidden fullscreen:block">·</div>
            <div className="text-xs leading-normal">
              {moment(parseFloat(post.createdAt)).local().fromNow()}
            </div>
          </div>
          <div className="table table-fixed w-full whitespace-pre-wrap break-words text-vs">
            {useRichBodyText(post.body)}
          </div>
        </div>
      </div>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
    </div>
  );
};
