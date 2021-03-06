import { FullUserFragment, useFollowMutation } from "@ferman-pkgs/controller";
import { followMutationOptions } from "@ferman-pkgs/controller";
import Link from "next/link";
import React from "react";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import { useScreenType } from "../shared-hooks/useScreenType";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { MyButton } from "./MyButton";

interface UserSummaryCardProps {
  user: FullUserFragment;
  me: FullUserFragment | null;
}

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  user,
  me,
}) => {
  const { t } = useTypeSafeTranslation();
  const screenType = useScreenType();

  const [followUser, { loading: followLoading }] = useFollowMutation();
  const followUserHandler = async () => {
    const { data } = await followUser(
      followMutationOptions({
        userId: user.id,
      }) as any
    );

    if (!data || data.follow.error || !data.follow.users) {
      return toast.error(t("errors.500"));
    }
  };

  const FollowButtonText = user.followingStatus
    ? t("user.unfollow")
    : t("user.follow");
  const FollowButtonIcon = user.followingStatus ? (
    <AiOutlineUserDelete size="16px" className="text-red-600" />
  ) : (
    <AiOutlineUserAdd size="16px" className="text-primary-700" />
  );

  return (
    <div className="p-3 flex flex-col">
      <div className="flex">
        <div>
          <Link href={`/user/${encodeURIComponent(user.uid)}`}>
            <img
              src={user.profile?.avatarUrl}
              className="w-9 h-9 rounded-35 cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col ml-3">
          <div className="flex justify-between flex-1">
            <div>
              <Link href={`/user/${encodeURIComponent(user.uid)}`} shallow>
                <div
                  className={`flex flex-col group cursor-pointer leading-${
                    user.followsYouStatus ? "normal" : "tight"
                  }`}
                >
                  <div className="group-hover:underline text-md font-bold text-primary-600">
                    {user.username}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="text-xs text-primary-450">@{user.uid}</div>
                    {user.followsYouStatus && (
                      <div className="bg-primary-200 text-primary-450 font-semibold rounded-md px-1.5 leading-relaxed text-2xs">
                        {t("user.follows_you")}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
            <div>
              {me?.id !== user.id && (
                <MyButton
                  size="small"
                  isLoading={followLoading}
                  color={
                    screenType === "fullscreen"
                      ? "transparent"
                      : user.followingStatus
                      ? "danger"
                      : "primary"
                  }
                  onClick={followUserHandler}
                >
                  {screenType === "fullscreen"
                    ? FollowButtonIcon
                    : FollowButtonText}
                </MyButton>
              )}
            </div>
          </div>
          {!!user.profile?.bio && (
            <div className="mt-1.5">
              <div className="table table-fixed break-words whitespace-pre-wrap text-xs text-primary-500">
                {useRichBodyText(user.profile.bio)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
