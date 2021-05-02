import React from "react";
import {
  FullUserFragment,
  useFollowUserMutation,
} from "@ferman-pkgs/controller";
import { ImLocation2 } from "react-icons/im";
import { FaBirthdayCake } from "react-icons/fa";
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
  minimal?: boolean;
  marginBottom?: number;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  me,
  minimal = false,
  marginBottom = 0,
}) => {
  const router = useRouter();

  const [followUser] = useFollowUserMutation();

  return (
    <div
      className="bg-gray-100 rounded-xl text-gray-700 divide-y-2"
      style={{
        marginBottom,
      }}
    >
      <div className="flex justify-between flex-col">
        <div
          className="w-full backdrop-filter-none rounded-t-xl bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://www.gravatar.com/avatar/${user.md5})`,
          }}
        >
          <div className="p-4 h-28 relative rounded-t-xl backdrop-filter backdrop-blur-xl">
            <img
              className="rounded-full border-4 border-solid border-gray-100 absolute top-3/4"
              src={`https://www.gravatar.com/avatar/${user.md5}`}
              style={{
                width: 54,
                height: 54,
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between mb-2">
          <div className="ml-2 mt-6">
            <div className="flex flex-col">
              <div className="font-bold text-base leading-tight">
                {user.username}
              </div>
              <div className="text-xs leading-tight">
                @
                <NextLink href={`/user/${user.uid}`}>
                  <span className="link">{user.uid}</span>
                </NextLink>
              </div>
            </div>
            {!minimal && (
              <div className="text-xs mt-2 space-x-3">
                <NextLink href={`/user/${user.uid}/followers`}>
                  <span className="link">
                    <b>{user.followerCount} </b>
                    follower
                    {user.followerCount !== 1 && "s"}
                  </span>
                </NextLink>
                <NextLink href={`/user/${user.uid}/following`}>
                  <span className="link">
                    <b>{user.followingCount}</b> follow
                    {user.followingCount !== 1 && "s"}
                  </span>
                </NextLink>
              </div>
            )}
          </div>
          <div className="m-2">
            {me &&
              (me.id === user.id ? (
                !minimal && (
                  <MyButton
                    size="small"
                    onClick={() => router.push("/account/edit-profile")}
                  >
                    <FiEdit2 />
                    <span className="ml-1.5">Edit</span>
                  </MyButton>
                )
              ) : (
                <MyButton
                  size="small"
                  color={user.followingStatus ? "secondary" : "accent"}
                  onClick={async () => {
                    const { data } = await followUser({
                      variables: {
                        userId: user.id,
                      },
                    });

                    if (
                      !data ||
                      data.followUser.error ||
                      !data.followUser.users
                    ) {
                      return toast.error("Internal server error");
                    }
                  }}
                >
                  <span>{user.followingStatus ? "Unfollow" : "Follow"}</span>
                </MyButton>
              ))}
          </div>
        </div>
      </div>
      {!minimal && (
        <div className="divide-y-2">
          {!!user.profile?.bio && (
            <div className="text-xs whitespace-pre-wrap break-words p-2 text-gray-500">
              {richBodyText(user.profile?.bio)}
            </div>
          )}
          <div className="flex text-xs p-2 flex-col space-y-1">
            <div
              className="flex items-center text-gray-500 space-x-1"
              title="Join date"
            >
              <AiFillCalendar />
              <span>
                Joined:{" "}
                <b>{moment(parseFloat(user.createdAt)).format("MMMM YYYY")}</b>
              </span>
            </div>
            {!!user.profile?.location && (
              <div
                className="flex items-center text-gray-500 space-x-1"
                title="Location"
              >
                <ImLocation2 />
                <span
                  className="link"
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
            {user.profile?.showBirthdate && (
              <div
                className="flex items-center text-gray-500 space-x-1"
                title="Birthday"
              >
                <FaBirthdayCake />
                <span>
                  <b>
                    {moment(parseFloat(user.profile.birthdate)).format(
                      "MMM Do YYYY"
                    )}
                  </b>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
