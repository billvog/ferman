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
import { DeleteIcon, ChatIcon } from "@chakra-ui/icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
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
    <>
      <Box p=".05rem" bg="whitesmoke" borderBottomRadius="inherit">
        <Flex justifyContent="space-between" fontSize={14}>
          <Flex align="center">
            <Box>
              <Button
                variant="ghost"
                color="brown"
                fontSize={12}
                size="sm"
                isDisabled={!me || me.id === post.creator.id}
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
                <chakra.span ml={2}>{post.points}</chakra.span>
              </Button>
            </Box>
            <Box borderLeftWidth={1} ml={1} pl={4}>
              <Icon mr={2} as={ChatIcon} color="burlywood" w={3} h={3} />
              <chakra.span color="dimgrey" fontSize={12} fontWeight="600">
                {post.commentsCount}
              </chakra.span>
            </Box>
          </Flex>
          {me && me.id === post.creator.id && (
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
          )}
        </Flex>
        {me && me.id === post.creator.id && (
          <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody mt={3} pb={0}>
                <Text>
                  Delete post «
                  <chakra.span fontWeight="bold">{post.title}</chakra.span>»?
                </Text>
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
      </Box>
    </>
  );
};
