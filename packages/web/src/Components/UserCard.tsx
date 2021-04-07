import UserCardStyles from "../css/user-card.module.css";
import React from "react";
import {
  FullUserFragment,
  useFollowUserMutation,
} from "@ferman-pkgs/controller";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
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
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  me,
  minimal = false,
}) => {
  const router = useRouter();

  const [followUser] = useFollowUserMutation();

  let UserFollowIcon = AiOutlineUserAdd;
  if (user.followingStatus) {
    UserFollowIcon = AiOutlineUserDelete;
  }

  return (
    <div className={UserCardStyles.container}>
      <div className={UserCardStyles.mainSection}>
        <div className={UserCardStyles.leftSection}>
          <img
            className={UserCardStyles.userAvatar}
            src={`https://www.gravatar.com/avatar/${user.md5}`}
          />
          <div className={UserCardStyles.userInfo}>
            <NextLink href={`/user/${user.uid}`}>
              <div className={UserCardStyles.usernameContainer}>
                <div className={UserCardStyles.username}>{user.username}</div>
                <div className={UserCardStyles.uid}>@{user.uid}</div>
              </div>
            </NextLink>
            <div className={UserCardStyles.followContainer}>
              <NextLink href={`/user/${user.uid}/followers`}>
                <span className="link">
                  <b>{user.followerCount} </b>
                  follower
                  {user.followerCount !== 1 && "s"}
                </span>
              </NextLink>{" "}
              ·{" "}
              <NextLink href={`/user/${user.uid}/following`}>
                <span className="link">
                  <b>{user.followingCount}</b> follow
                  {user.followingCount !== 1 && "s"}
                </span>
              </NextLink>
            </div>
          </div>
        </div>
        <div>
          {me &&
            (me.id === user.id ? (
              <MyButton
                size="small"
                style={{
                  backgroundColor: "brown",
                }}
                onClick={() => router.push("/account/edit-profile")}
              >
                <FiEdit2 />
                <span style={{ marginLeft: 6 }}>Edit</span>
              </MyButton>
            ) : (
              <MyButton
                size="small"
                style={{
                  backgroundColor: user.followingStatus
                    ? "var(--error)"
                    : "var(--blue)",
                }}
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
                <UserFollowIcon />
                <span style={{ marginLeft: 6 }}>
                  {user.followingStatus ? "Unfollow" : "Follow"}
                </span>
              </MyButton>
            ))}
        </div>
      </div>
      {!minimal && (
        <>
          {!!user.profile?.bio && (
            <div className={UserCardStyles.bioContainer}>
              {richBodyText(user.profile?.bio)}
            </div>
          )}
          <div className={UserCardStyles.additionalInfoContainer}>
            <div className={UserCardStyles.infoItem} style={{ color: "brown" }}>
              <AiFillCalendar className={UserCardStyles.icon} />
              <span>
                Joined:{" "}
                <b>{moment(parseFloat(user.createdAt)).format("MMMM YYYY")}</b>
              </span>
            </div>
            {!!user.profile?.location && (
              <div className={UserCardStyles.infoItem}>
                <ImLocation2 className={UserCardStyles.icon} />
                <span>
                  Location: <b>{user.profile!.location}</b>
                </span>
              </div>
            )}
            {user.profile?.showBirthdate && (
              <div
                className={UserCardStyles.infoItem}
                style={{ color: "cornflowerblue" }}
              >
                <FaBirthdayCake className={UserCardStyles.icon} />
                <span>
                  Birthday:{" "}
                  <b>
                    {moment(parseFloat(user.profile.birthdate)).format(
                      "MMM Do YYYY"
                    )}
                  </b>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
