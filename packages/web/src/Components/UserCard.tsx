import React from "react";
import { FullUserFragment, useFollowMutation } from "@ferman-pkgs/controller";
import { ImLocation2 } from "react-icons/im";
import { GiBalloons } from "react-icons/gi";
import { AiFillCalendar } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import NextLink from "next/link";
import { useRichBodyText } from "../shared-hooks/useRichBodyText";
import moment from "moment";
import { MyButton } from "./MyButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { followMutationOptions } from "@ferman-pkgs/controller";

interface UserCardProps {
  user: FullUserFragment;
  me: FullUserFragment | null;
}

export const UserCard: React.FC<UserCardProps> = ({ user, me }) => {
  const { t } = useTypeSafeTranslation();

  const router = useRouter();
  const [followUser] = useFollowMutation();

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

  return (
    <div className="bg-primary-100 rounded-xl text-primary-700 divide-y-2">
      <div className="flex justify-between flex-col">
        <div
          className="w-full rounded-t-xl bg-cover bg-center bg-no-repeat object-cover"
          style={{
            backgroundImage: `url(${user.profile?.bannerUrl})`,
            backgroundColor: user.profile?.bannerUrl,
          }}
        >
          <div className="p-4 h-36 relative rounded-t-xl">
            <img
              className="rounded-full bg-primary-300 border-4 border-solid border-gray-100 absolute top-3/4"
              src={user.profile?.avatarUrl}
              style={{
                width: 60,
                height: 60,
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between mb-2">
          <div className="ml-2 mt-8">
            <NextLink href={`/user/${user.uid}`}>
              <div className="flex flex-col group cursor-pointer">
                <div className="font-bold text-primary-600 text-base leading-tight group-hover:underline">
                  {user.username}
                </div>
                <div
                  className={`flex items-center space-x-2 text-vs ${
                    user.followsYouStatus ? "mt-1" : "mt-0"
                  }`}
                >
                  <div className="font-medium text-primary-450">
                    @{user.uid}
                  </div>
                  {user.followsYouStatus && (
                    <div className="bg-primary-200 text-primary-450 font-semibold rounded-md px-1.5 text-xs leading-normal">
                      {t("user.follows_you")}
                    </div>
                  )}
                </div>
              </div>
            </NextLink>
          </div>
          <div className="m-2">
            {me &&
              (me.id === user.id ? (
                <MyButton
                  size="small"
                  onClick={() => router.push("/account/edit-profile")}
                >
                  <FiEdit2 />
                  <span className="ml-1.5">{t("button.edit")}</span>
                </MyButton>
              ) : (
                <MyButton
                  size="small"
                  color={user.followingStatus ? "danger" : "primary"}
                  onClick={followUserHandler}
                >
                  <span>
                    {user.followingStatus
                      ? t("user.unfollow")
                      : t("user.follow")}
                  </span>
                </MyButton>
              ))}
          </div>
        </div>
        <div className="text-vs ml-2 my-2 space-x-3.5">
          <NextLink href={`/user/${user.uid}/followers`}>
            <span className="cursor-pointer group">
              <span className="text-primary-500 font-bold">
                {user.followersCount}
              </span>{" "}
              <span className="text-primary-450 group-hover:underline">
                {user.followersCount === 1
                  ? t("user.one_follower")
                  : t("user.x_followers")}
              </span>
            </span>
          </NextLink>
          <NextLink href={`/user/${user.uid}/following`}>
            <span className="group cursor-pointer">
              <span className="font-bold text-primary-500">
                {user.followingsCount}
              </span>{" "}
              <span className="text-primary-450 group-hover:underline">
                {user.followingsCount === 1
                  ? t("user.one_following")
                  : t("user.x_followings").replace(
                      "%count%",
                      user.followingsCount.toString()
                    )}
              </span>
            </span>
          </NextLink>
        </div>
      </div>
      <div className="divide-y-2">
        {!!user.profile?.bio && (
          <div className="text-vs whitespace-pre-wrap break-words p-2 text-primary-500">
            {useRichBodyText(user.profile?.bio)}
          </div>
        )}
        <div className="flex text-xs p-2 flex-col space-y-1">
          <div
            className="flex items-center text-primary-500 space-x-1"
            title="Join date"
          >
            <AiFillCalendar />
            <span className="space-x-1">
              <span>{t("user.joined")}:</span>
              <b>
                {moment(parseFloat(user.createdAt)).local().format("MMMM YYYY")}
              </b>
            </span>
          </div>
          {user.profile?.showBirthdate && (
            <div
              className="flex items-center text-primary-500 space-x-1"
              title="Birthday"
            >
              <GiBalloons />
              <span className="space-x-1">
                <span>{t("user.birthday")}:</span>
                <b>
                  {moment(parseFloat(user.profile.birthdate))
                    .local()
                    .format("MMM Do YYYY")}
                </b>
              </span>
            </div>
          )}
          {!!user.profile?.location && (
            <div
              className="flex items-center text-primary-500 space-x-1"
              title={t("user.location")}
            >
              <ImLocation2 />
              <span
                className="hover:underline cursor-pointer"
                onClick={() =>
                  router.push(
                    "/explore/users?location=" +
                      encodeURI(user.profile!.location)
                  )
                }
              >
                <b>{user.profile!.location}</b>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
