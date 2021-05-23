import React from "react";
import { FullCommentFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { CommentActionButtons } from "./CommentActionButtons";
import moment from "moment";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import Link from "next/link";
import { CgMailReply } from "react-icons/cg";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import processString from "react-process-string";

interface PostCommentProps {
  me: FullUserFragment | null;
  comment: FullCommentFragment;
  onDelete?: () => any;
  showPostInfo?: boolean;
}

export const PostComment: React.FC<PostCommentProps> = ({
  me,
  comment,
  onDelete,
  showPostInfo = false,
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <div>
      <div className="flex flex-col p-3 pb-0">
        {showPostInfo && (
          <div className="flex items-center text-vs 1cols:text-sm text-primary-400 pb-2">
            <CgMailReply />
            <span className="ml-1.5">
              {processString([
                {
                  regex: /%user%/,
                  fn: (key: any, res: any) => (
                    <Link
                      href={`/user/${
                        comment.parent?.user.uid || comment.post.creator.uid
                      }`}
                      key={key}
                    >
                      <span className="font-semibold hover:underline cursor-pointer">
                        {comment.parent?.user.uid || comment.post.creator.uid}
                      </span>
                    </Link>
                  ),
                },
                {
                  regex: /@(.*)@/,
                  fn: (key: any, res: any) => (
                    <Link
                      href={
                        comment.parent
                          ? `/post/${comment.postId}/comment/${comment.parentId}`
                          : `/post/${comment.postId}`
                      }
                      key={key}
                    >
                      <span className="hover:underline cursor-pointer">
                        {res[1]}
                      </span>
                    </Link>
                  ),
                },
              ])(
                t(
                  comment.parentId
                    ? "comment.reply_to_comment"
                    : "comment.reply_to_post"
                )
              )}
            </span>
          </div>
        )}
        <div className="flex">
          <div>
            <img
              className="w-8 h-8 rounded-35 mr-3"
              src={comment.user.profile?.avatarUrl}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between 1cols:justify-start 1cols:items-center 1cols:mb-0 mb-1.5 leading-none text-primary-450 space-x-1.5">
              <Link href={`/user/${comment.user.uid}`}>
                <div className="group flex flex-col 1cols:flex-row 1cols:items-center 1cols:space-x-1.5 cursor-pointer">
                  <div className="group-hover:underline text-sm text-primary-700 font-bold">
                    {comment.user.username}
                  </div>
                  <div className="text-xs">@{comment.user.uid}</div>
                </div>
              </Link>
              <div className="hidden 1cols:block">·</div>
              <div className="text-xs leading-normal">
                {moment(parseFloat(comment.createdAt)).local().fromNow()}
              </div>
            </div>
            <div className="table table-fixed whitespace-pre-wrap break-words text-xs">
              {useRichBodyText(comment.text)}
            </div>
          </div>
        </div>
      </div>
      <CommentActionButtons comment={comment} me={me} onDelete={onDelete} />
    </div>
  );
};
