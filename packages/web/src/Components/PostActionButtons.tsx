import PostActionsStyles from "../css/post-actions.module.css";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillChatSquareFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  FullPostFragment,
  FullUserFragment,
  useDeletePostMutation,
  useLikePostMutation,
} from "@ferman-pkgs/controller";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Modal from "react-modal";
import { CenteredModalOptions, ModalStyles } from "../utils/modalOptions";
import styled from "styled-components";
import { MyButton } from "./MyButton";

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
  const [likePost] = useLikePostMutation();
  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();

  let LikeIconComponent = AiOutlineHeart;
  if (post.likeStatus) {
    LikeIconComponent = AiFillHeart;
  }

  // delete confirm modal
  const [isDelModalOpen, setDelModalOpen] = useState(false);

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
                  return toast.error("Could not like post");
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
        <div className={PostActionsStyles.rightSection}>
          {me && me.id === post.creator.id && (
            <Menu
              menuButton={
                <MenuButton className={PostActionsStyles.moreOptionsButton}>
                  <FiChevronDown />
                </MenuButton>
              }
            >
              <MenuItem onClick={() => setDelModalOpen(true)}>
                <div className={PostActionsStyles.deleteMenuOption}>
                  <RiDeleteBinFill />
                  <span>Delete</span>
                </div>
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
      {/* Confirm modal */}
      {me && me.id === post.creator.id && (
        <Modal
          isOpen={isDelModalOpen}
          onRequestClose={() => setDelModalOpen(false)}
          style={CenteredModalOptions}
          contentLabel="Confirm"
        >
          <ModalStyles.Title>Proceed deleting this post?</ModalStyles.Title>
          <ModalStyles.Message>
            Clicking "Delete" button, all likes and comments of this post will
            be deleted. Any further action, will not be able to be undone.
          </ModalStyles.Message>
          <ModalStyles.ButtonContainer>
            <MyButton
              isLoading={deletePostLoading}
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

                setDelModalOpen(false);
                toast.success("Post deleted");

                if (typeof onDelete === "function") {
                  return onDelete();
                }
              }}
            >
              Delete
            </MyButton>
            <ModalStyles.SecondaryButton onClick={() => setDelModalOpen(false)}>
              Cancel
            </ModalStyles.SecondaryButton>
          </ModalStyles.ButtonContainer>
        </Modal>
      )}
    </div>
  );
};
