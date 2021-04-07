import CommentActionsStyles from "../css/comment-actions.module.css";
import {
  FullCommentFragment,
  FullUserFragment,
  useDeleteCommentMutation,
} from "@ferman-pkgs/controller";
import React from "react";
import { BsFillChatSquareFill } from "react-icons/bs";

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
  const [deleteComment] = useDeleteCommentMutation();

  return (
    <div className={CommentActionsStyles.container}>
      <div className={CommentActionsStyles.actionsWrapper}>
        <div className={CommentActionsStyles.leftSection}>
          <div className={CommentActionsStyles.repliesContainer}>
            <BsFillChatSquareFill color="burlywood" />
            <span className={CommentActionsStyles.repliesCount}>
              {comment.repliesCount}
            </span>
          </div>
        </div>
        {/* {me && me.id === comment.user.id && (
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
                        update: (cache, {}) => {
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
        )} */}
      </div>
    </div>
  );
};
