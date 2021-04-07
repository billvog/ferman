import PostActionsStyles from "../css/post-actions.module.css";
import {
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillChatSquareFill } from "react-icons/bs";
import {
  FullPostFragment,
  FullUserFragment,
  useDeletePostMutation,
  useLikePostMutation,
} from "@ferman-pkgs/controller";

interface PostActionButtonsProps {
  post: FullPostFragment;
  me: FullUserFragment | null;
  onDelete?: () => void;
}

export const PostActionButtons: React.FC<PostActionButtonsProps> = ({
  post,
  me,
  onDelete,
}) => {
  const toast = useToast();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [likePost] = useLikePostMutation();
  const [deletePost] = useDeletePostMutation();

  let LikeIconComponent = AiOutlineHeart;
  if (post.likeStatus) {
    LikeIconComponent = AiFillHeart;
  }

  return (
    <div
      className={`${PostActionsStyles.container} ${
        post.likeStatus ? PostActionsStyles.liked : ""
      }`}
    >
      <div className={PostActionsStyles.actionsWrapper}>
        <div className={PostActionsStyles.leftSection}>
          <div>
            <button
              className={PostActionsStyles.likeButton}
              disabled={!me || me.id === post.creator.id}
              onClick={async () => {
                const { data } = await likePost({
                  variables: {
                    postId: post.id,
                  },
                });

                if (!data || data.like.error) {
                  return toast({
                    title: "Error",
                    description: "Could not like post",
                    status: "error",
                    duration: 5000,
                  });
                }
              }}
            >
              <LikeIconComponent size="14px" />
              <span className={PostActionsStyles.pointsCount}>
                {post.points}
              </span>
            </button>
          </div>
          <div className={PostActionsStyles.repliesContainer}>
            <BsFillChatSquareFill color="burlywood" />
            <span className={PostActionsStyles.repliesCount}>
              {post.commentsCount}
            </span>
          </div>
        </div>
        {/* {me && me.id === post.creator.id && (
          <Menu>
            <MenuButton>
              <IconButton
                aria-label="more options"
                icon={<HiDotsHorizontal size="12px" />}
                size="sm"
                variant="ghost"
                color="brown"
              />
            </MenuButton>
            <MenuList fontSize={13}>
              <MenuItem
                color="red"
                onClick={onDeleteModalOpen}
                fontWeight="600"
              >
                <DeleteIcon mr={2} /> Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )} */}
      </div>
      {me && me.id === post.creator.id && (
        <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody mt={3} pb={0}>
              <Text>Delete this post?</Text>
              <Text fontSize="smaller" color="grey">
                Are you sure you want to remove this post? All comments and
                likes will be removed as well.
              </Text>
            </ModalBody>
            <ModalFooter pt={4}>
              <Button
                mr={2}
                fontSize={14}
                colorScheme="blue"
                onClick={onDeleteModalClose}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                fontSize={14}
                size="sm"
                onClick={async () => {
                  const response = await deletePost({
                    variables: {
                      id: post.id,
                    },
                    update: (cache) => {
                      cache.evict({ id: "Post:" + post.id });
                    },
                  });

                  if (response.errors || !response.data?.deletePost) {
                    return toast({
                      title: "Error",
                      description: "Could not delete post",
                      status: "error",
                      duration: 5000,
                    });
                  }

                  toast({
                    title: "Success",
                    description: "Post deleted",
                    status: "success",
                    duration: 5000,
                  });

                  if (typeof onDelete === "function") {
                    return onDelete();
                  }
                }}
              >
                <DeleteIcon mr={2} />
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};
