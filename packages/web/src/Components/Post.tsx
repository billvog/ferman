import React from "react";
import { FullPostFragment, FullUserFragment } from "@ferman-pkgs/controller";
import { PostActionButtons } from "./PostActionButtons";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import Link from "next/link";
import dayjs from "dayjs";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface PostProps {
  me: FullUserFragment | null;
  post: FullPostFragment;
  onDelete?: () => void;
}

export const Post: React.FC<PostProps> = ({ post, me, onDelete }) => {
  const { t } = useTypeSafeTranslation();

  return (
    <div>
      <div className="flex flex-col p-4 pb-0">
        <div className="flex">
          <div className="min-w-max">
            <img
              className="w-8 h-8 rounded-35 mr-3"
              src={post.creator.profile?.avatarUrl}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-1.5 text-primary-450 space-x-1.5">
              <Link
                href={`/user/${encodeURIComponent(post.creator.uid)}`}
                shallow
              >
                <div className="group flex flex-col cursor-pointer">
                  <div className="group-hover:underline text-md fullscreen:text-base text-primary-700 font-bold fullscreen:leading-tight">
                    {post.creator.username}
                  </div>
                  <div className="text-vs fullscreen:text-sm fullscreen:leading-tight">
                    @{post.creator.uid}
                  </div>
                </div>
              </Link>
              <div className="text-sm leading-normal">
                {dayjs(parseFloat(post.createdAt)).fromNow()}
              </div>
            </div>
            <div>
              {!!post.parentPost && (
                <div className="text-sm text-primary-500 font-medium">
                  <span className="mr-1">{t("post.replying_to")}</span>
                  <Link
                    href={`/user/${encodeURIComponent(
                      post.parentPost.creator.uid
                    )}`}
                    shallow
                  >
                    <span className="font-semibold cursor-pointer group text-accent-washed-out">
                      @
                      <span className="group-hover:underline">
                        {post.parentPost.creator.uid}
                      </span>
                    </span>
                  </Link>
                </div>
              )}
              <div className="table table-fixed w-full whitespace-pre-wrap break-word text-primary-800 text-vs fullscreen:text-sm">
                {useRichBodyText(post.body)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostActionButtons post={post} me={me} onDelete={onDelete} />
    </div>
  );
};
