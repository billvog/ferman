import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  IconButton,
  Link,
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
import {
  FullCommentFragment,
  FullUserFragment,
  useDeleteCommentMutation,
} from "@ferman/controller";
import NextLink from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface CommentActionButtonsProps {
  comment: FullCommentFragment;
  me: FullUserFragment | null;
  onDelete?: () => void;
}

export const CommentActionButtons: React.FC<CommentActionButtonsProps> = ({
  me,
  comment,
  onDelete,
}) => {
  const toast = useToast();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [deleteComment] = useDeleteCommentMutation();

  return (
    <>
      <Box
        p=".1rem"
        bg="whitesmoke"
        borderTopWidth={1}
        borderBottomRadius="inherit"
      >
        <Flex justifyContent="space-between" align="center">
          <Box ml={2}>
            <NextLink href={`/post/${comment.postId}/comment/${comment.id}`}>
              <Link title="View replies">
                <Icon as={ChatIcon} mr={2} color="burlywood" w={3} h={3} />
                <chakra.span color="dimgrey" fontSize={12} fontWeight="600">
                  {comment.repliesCount}
                </chakra.span>
              </Link>
            </NextLink>
          </Box>
          {me && me.id === comment.user.id && (
            <Box>
              <Menu>
                <MenuButton>
                  <IconButton
                    h={7}
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
              <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalBody mt={3} pb={0}>
                    <Text>Delete this comment?</Text>
                    <Text fontSize="smaller" color="grey">
                      Are you sure you want to remove this comment?
                    </Text>
                  </ModalBody>
                  <ModalFooter pt={4}>
                    <Button
                      mr={2}
                      colorScheme="blue"
                      onClick={onDeleteModalClose}
                      size="sm"
                    >
                      Close
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={async () => {
                        const response = await deleteComment({
                          variables: {
                            id: comment.id,
                          },
                          update: (cache) => {
                            if (comment.parentId)
                              cache.evict({
                                id: "Comment:" + comment.parentId,
                              });

                            cache.evict({ id: "Comment:" + comment.id });
                            cache.evict({ id: "Post:" + comment.postId });
                          },
                        });

                        if (response.errors || !response.data?.deleteComment) {
                          return toast({
                            title: "Error",
                            description: "Could not delete comment",
                            status: "error",
                            duration: 5000,
                          });
                        }

                        toast({
                          title: "Success",
                          description: "Comment deleted",
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
            </Box>
          )}
        </Flex>
      </Box>
    </>
  );
};
