import React from "react";
import { FullCommentFragment, FullUserFragment } from "@ferman-pkgs/controller";
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
    <div className="border border-gray-200 rounded-xl">
      <div className={`flex p-3`}>
        <div>
          <img
            className="w-8 h-8 rounded-35 mr-3"
            src={comment.user.profile?.avatarUrl}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mobile:justify-start mobile:items-center mobile:mb-0 mb-1.5 leading-none text-gray-400 space-x-1.5">
            <div className="group flex flex-col mobile:flex-row mobile:items-center mobile:space-x-1.5 cursor-pointer">
              <div className="group-hover:underline text-sm text-gray-700 font-bold">
                {comment.user.username}
              </div>
              <div className="text-xs">@{comment.user.uid}</div>
            </div>
            <div className="hidden mobile:block">·</div>
            <div className="text-xs leading-normal">
              {moment(parseFloat(comment.createdAt)).local().fromNow()}
            </div>
          </div>
          <div className={`text-xs whitespace-pre-wrap break-words truncate`}>
            {richBodyText(comment.text)}
          </div>
        </div>
      </div>
      <CommentActionButtons comment={comment} me={me} onDelete={onDelete} />
    </div>
  );
};
