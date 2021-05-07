import React from "react";
import {
  FullUserFragment,
  useFollowUserMutation,
} from "@ferman-pkgs/controller";
import { ImLocation2 } from "react-icons/im";
import { GiBalloons } from "react-icons/gi";
import { AiFillCalendar } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import NextLink from "next/link";
import { richBodyText } from "../utils/richBodyText";
import moment from "moment";
import { MyButton } from "./MyButton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface UserCardProps {
  user: FullUserFragment;
  me: FullUserFragment | null;
}

export const UserCard: React.FC<UserCardProps> = ({ user, me }) => {
  const router = useRouter();
  const [followUser] = useFollowUserMutation();

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
    <div className="bg-primary-100 rounded-xl text-primary-700 divide-y-2">
      <div className="flex justify-between flex-col">
        <div
          className="w-full rounded-t-xl bg-cover bg-center bg-no-repeat object-cover border-4 border-gray-100"
          style={{
            backgroundImage: `url(${user.profile?.bannerUrl})`,
            backgroundColor: user.profile?.bannerUrl,
          }}
        >
          <div className="p-4 h-28 relative rounded-t-xl">
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
                <div className="font-bold text-primary text-base leading-tight group-hover:underline">
                  {user.username}
                </div>
                <div
                  className={`flex items-center space-x-2 text-vs ${
                    user.followsYouStatus ? "mt-1" : "mt-0"
                  }`}
                >
                  <div className="font-medium text-primary-washed-out">
                    @{user.uid}
                  </div>
                  {user.followsYouStatus && (
                    <div className="bg-primary-200 text-primary-450 font-semibold rounded-lg px-1.5 text-2xs">
                      Follows you
                    </div>
                  )}
                </div>
              </div>
            </NextLink>
            <div className="text-vs mt-3 space-x-3">
              <NextLink href={`/user/${user.uid}/followers`}>
                <span className="hover:underline cursor-pointer">
                  <b>{user.followerCount} </b>
                  follower
                  {user.followerCount !== 1 && "s"}
                </span>
              </NextLink>
              <NextLink href={`/user/${user.uid}/following`}>
                <span className="hover:underline cursor-pointer">
                  <b>{user.followingCount}</b> following
                  {user.followingCount !== 1 && "s"}
                </span>
              </NextLink>
            </div>
          </div>
          <div className="m-2">
            {me &&
              (me.id === user.id ? (
                <MyButton
                  size="small"
                  onClick={() => router.push("/account/edit-profile")}
                >
                  <FiEdit2 />
                  <span className="ml-1.5">Edit</span>
                </MyButton>
              ) : (
                <MyButton
                  size="small"
                  color={user.followingStatus ? "secondary" : "accent"}
                  onClick={followUserHandler}
                >
                  <span>{user.followingStatus ? "Unfollow" : "Follow"}</span>
                </MyButton>
              ))}
          </div>
        </div>
      </div>
      <div className="divide-y-2">
        {!!user.profile?.bio && (
          <div className="text-vs whitespace-pre-wrap break-words p-2 text-primary-500">
            {richBodyText(user.profile?.bio)}
          </div>
        )}
        <div className="flex text-xs p-2 flex-col space-y-1">
          <div
            className="flex items-center text-primary-500 space-x-1"
            title="Join date"
          >
            <AiFillCalendar />
            <span className="space-x-1">
              <span>Joined:</span>
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
                <span>Birthday:</span>
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
              title="Location"
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
