import CommentActionsStyles from "../css/comment-actions.module.css";
import {
  FullCommentFragment,
  FullUserFragment,
  useDeleteCommentMutation,
} from "@ferman-pkgs/controller";
import React, { useState } from "react";
import { BsFillChatSquareFill } from "react-icons/bs";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { FiChevronDown } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import Modal from "react-modal";
import { CenteredModalOptions, ModalStyles } from "../utils/modalOptions";
import { MyButton } from "./MyButton";
import { toast } from "react-toastify";

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
  const [
    deleteComment,
    { loading: deleteCommentLoading },
  ] = useDeleteCommentMutation();

  // delete confirm modal
  const [isDelModalOpen, setDelModalOpen] = useState(false);

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
        {me && me.id === comment.user.id && (
          <div>
            <Menu
              menuButton={
                <MenuButton className={CommentActionsStyles.moreOptionsButton}>
                  <FiChevronDown />
                </MenuButton>
              }
            >
              <MenuItem onClick={() => setDelModalOpen(true)}>
                <div className={CommentActionsStyles.deleteMenuOption}>
                  <RiDeleteBinFill />
                  <span>Delete</span>
                </div>
              </MenuItem>
            </Menu>
            <Modal
              isOpen={isDelModalOpen}
              onRequestClose={() => setDelModalOpen(false)}
              style={CenteredModalOptions}
              contentLabel="Confirm"
            >
              <ModalStyles.Title>
                Proceed deleting this comment?
              </ModalStyles.Title>
              <ModalStyles.Message>
                Clicking "Delete" button, all replies of this comment will be
                deleted. Any further action, will not be able to be undone.
              </ModalStyles.Message>
              <ModalStyles.ButtonContainer>
                <MyButton
                  isLoading={deleteCommentLoading}
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
                      return toast.error("Could not delete comment");
                    }

                    setDelModalOpen(false);
                    toast.success("Comment deleted");

                    if (typeof onDelete === "function") {
                      return onDelete();
                    }
                  }}
                >
                  Delete
                </MyButton>
                <ModalStyles.SecondaryButton
                  onClick={() => setDelModalOpen(false)}
                >
                  Cancel
                </ModalStyles.SecondaryButton>
              </ModalStyles.ButtonContainer>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};
