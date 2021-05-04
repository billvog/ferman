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
  clickable?: boolean;
}

export const PostComment: React.FC<PostCommentProps> = ({
  me,
  comment,
  onDelete,
  clickable,
}) => {
  const CommentWrapperComponent: any = clickable ? NextLink : React.Fragment;

  return (
    <div className="border border-gray-200 rounded-xl">
      <div className="py-1.5 px-2.5">
        <div className="flex justify-between mobile:items-center mb-1 mobile:mb-0">
          <div className="flex items-center">
            <NextLink href={`/user/${comment.user.uid}`}>
              <div className="cursor-pointer flex flex-col mobile:flex-row mobile:space-x-1">
                <div className="text-secondary-washed-out font-bold text-xs">
                  {comment.user.username}
                </div>
                <div className="text-xs text-gray-400 hidden mobile:block">
                  ·
                </div>
                <div className="flex text-2xs text-gray-400">
                  @<div className="link font-semibold">{comment.user.uid}</div>
                </div>
              </div>
            </NextLink>
          </div>
          <div className="text-2xs text-gray-400">
            {moment.utc(parseFloat(comment.createdAt)).local().fromNow()}
          </div>
        </div>
        <CommentWrapperComponent
          href={`/post/${comment.postId}/comment/${comment.id}`}
        >
          <div
            className={`whitespace-pre-wrap text-2xs ${
              clickable ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {richBodyText(comment.text)}
          </div>
        </CommentWrapperComponent>
      </div>
      <CommentActionButtons comment={comment} me={me} onDelete={onDelete} />
    </div>
  );
};
