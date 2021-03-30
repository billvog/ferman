import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FullUserFragment, useFollowUserMutation } from "@ferman/controller";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { FaBirthdayCake } from "react-icons/fa";
import NextLink from "next/link";
import { richBodyText } from "../utils/richBodyText";
import moment from "moment";

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
  const toast = useToast();

  const [followUser] = useFollowUserMutation();

  let UserFollowIcon = AiOutlineUserAdd;
  if (user.followingStatus) {
    UserFollowIcon = AiOutlineUserDelete;
  }

  return (
    <Box mb={2} bg="whitesmoke" borderRadius="xl" color="mainDarkBlue">
      <Flex p={2} justifyContent="space-between">
        <Flex>
          <Avatar src={`https://www.gravatar.com/avatar/${user.emailHash}`} />
          <Box ml={3}>
            <Text fontWeight="700" fontSize={13}>
              {user.username}
            </Text>
            <Text fontSize={12}>
              @
              <Link>
                <NextLink href={`/user/${user.uid}`}>{user.uid}</NextLink>
              </Link>
            </Text>
            <Text fontSize={12}>
              <Box>
                <NextLink href={`/user/${user.uid}/followers`}>
                  <Link>
                    <chakra.b>{user.followerCount} </chakra.b>
                    follower
                    {user.followerCount !== 1 && "s"}
                  </Link>
                </NextLink>{" "}
                ·{" "}
                <NextLink href={`/user/${user.uid}/following`}>
                  <Link>
                    <chakra.b>{user.followingCount}</chakra.b> follow
                    {user.followingCount !== 1 && "s"}
                  </Link>
                </NextLink>
              </Box>
            </Text>
          </Box>
        </Flex>
        <Box>
          {me &&
            (me.id === user.id ? (
              <NextLink href="/account/edit-profile">
                <Button p=".5rem" height="25px" fontSize={11}>
                  <EditIcon />
                  <chakra.span ml={2}>Edit</chakra.span>
                </Button>
              </NextLink>
            ) : (
              <Button
                p=".4rem"
                height="22px"
                fontSize={12}
                colorScheme={user.followingStatus ? "red" : "blue"}
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
                    return toast({
                      title: "Error",
                      description: "Internal server error",
                      status: "error",
                      duration: 5000,
                    });
                  }
                }}
              >
                <UserFollowIcon />
                <chakra.span ml={2}>
                  {user.followingStatus ? "Unfollow" : "Follow"}
                </chakra.span>
              </Button>
            ))}
        </Box>
      </Flex>
      {!minimal && (
        <>
          {!!user.profile?.bio && (
            <Text
              mt={1}
              p={2}
              px={3}
              borderTopWidth={1}
              fontSize={11}
              fontWeight="600"
              whiteSpace="pre-wrap"
              color={!!user.profile?.bio ? "grey" : "lightgrey"}
            >
              {richBodyText(user.profile?.bio)}
            </Text>
          )}
          <Flex
            direction="column"
            mt={1}
            p={2}
            px={3}
            borderBottomRadius="inherit"
            borderTopWidth={1}
            fontSize={12}
            fontWeight="500"
          >
            <Flex align="center" color="brown">
              <CalendarIcon mr={2} />
              <Text>
                Joined:{" "}
                <chakra.b>
                  {moment(parseFloat(user.createdAt)).format("MMMM YYYY")}
                </chakra.b>
              </Text>
            </Flex>
            {!!user.profile?.location && (
              <Flex align="center">
                <Icon as={ImLocation2} mr={2} />
                <Text>
                  Location: <chakra.b>{user.profile!.location}</chakra.b>
                </Text>
              </Flex>
            )}
            {user.profile?.showBirthdate && (
              <Flex align="center" color="cornflowerblue">
                <Icon as={FaBirthdayCake} mr={2} />
                <Text>
                  Birthday:{" "}
                  <chakra.b>
                    {moment(parseFloat(user.profile.birthdate)).format(
                      "MMM Do YYYY"
                    )}
                  </chakra.b>
                </Text>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};
