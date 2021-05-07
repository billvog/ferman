import {
  FullUserFragment,
  useFollowUserMutation,
} from "@ferman-pkgs/controller";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { richBodyText } from "../utils/richBodyText";
import { MyButton } from "./MyButton";

interface UserSummaryCardProps {
  user: FullUserFragment;
  me: FullUserFragment | null;
}

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  user,
  me,
}) => {
  const [followUser, { loading: followLoading }] = useFollowUserMutation();

  const followUserHandler = async () => {
    const { data } = await followUser({
      variables: {
        userId: user.id,
      },
    });

    if (!data || data.followUser.error || !data.followUser.users) {
      return toast.error("Internal server error");
    }
  };

  return (
    <div className="bg-primary-100 rounded-xl p-2 flex flex-col">
      <div className="flex">
        <div>
          <Link href={`/user/${encodeURIComponent(user.uid)}`}>
            <img
              src={user.profile?.avatarUrl}
              className="rounded-35 cursor-pointer"
              style={{
                width: 42,
                height: 42,
              }}
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col ml-2">
          <div className="flex justify-between flex-1">
            <div>
              <Link href={`/user/${encodeURIComponent(user.uid)}`}>
                <div
                  className={`flex flex-col group cursor-pointer leading-${
                    user.followsYouStatus ? "normal" : "tight"
                  }`}
                >
                  <div className="group-hover:underline text-md font-bold text-secondary truncate">
                    {user.username}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="text-vs text-secondary-washed-out truncate">
                      @{user.uid}
                    </div>
                    {user.followsYouStatus && (
                      <div className="bg-primary-200 text-secondary-450 font-semibold rounded-md px-1.5 leading-relaxed text-2xs">
                        Follows you
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
                  color={user.followingStatus ? "secondary" : "accent"}
                  onClick={followUserHandler}
                >
                  <span>{user.followingStatus ? "Unfollow" : "Follow"}</span>
                </MyButton>
              )}
            </div>
          </div>
          {!!user.profile?.bio && (
            <div className="mt-1.5">
              <div className="text-xs text-secondary-450 truncate whitespace-normal">
                {richBodyText(user.profile.bio)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
