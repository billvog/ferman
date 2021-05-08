import { toast } from "react-toastify";
import React, { Fragment, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillChatSquareFill } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import { CgMoreAlt } from "react-icons/cg";
import {
  FullPostFragment,
  FullUserFragment,
  useDeletePostMutation,
  useLikePostMutation,
} from "@ferman-pkgs/controller";
import { Menu, Transition } from "@headlessui/react";
import { MyButton } from "./MyButton";
import { MyDialog } from "./MyDialog";
import Link from "next/link";

const actionClassname =
  "flex items-center border-none outline-none cursor-pointer disabled:cursor-default bg-transparent group";

const actionIconColorClassnames = {
  red: "group-hover:bg-red-600 group-hover:bg-opacity-10",
  secondary: "group-hover:bg-secondary-transparent",
  accent: "group-hover:bg-accent-transparent",
};

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
  const [isDelModalOpen, setDelModalOpen] = useState(false);

  const [likePost] = useLikePostMutation();
  const LikePostHandler = async () => {
    const { data } = await likePost({
      variables: {
        postId: post.id,
      },
    });

    if (!data || data.likePost.error) {
      return toast.error("Could not like post");
    }
  };

  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();
  const DeletePostHandler = async () => {
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
  };

  const canILike = !(!me || me.id === post.creator.id);
  let LikeIconComponent = AiOutlineHeart;
  if (post.likeStatus) {
    LikeIconComponent = AiFillHeart;
  }

  return (
    <div className="p-1 bg-primary-50 rounded-b-xl">
      <div className="flex justify-center items-center space-x-7 text-xs leading-none">
        <button
          className={`text-red-${canILike ? "500" : "300"} ${actionClassname}`}
          disabled={!canILike}
          onClick={LikePostHandler}
        >
          <div
            className={`rounded-full p-2 transition-colors duration-150 ${
              canILike ? actionIconColorClassnames.red : "text-red-300"
            }`}
          >
            <LikeIconComponent size="14px" />
          </div>
          <span className="ml-1 font-semibold">{post.points}</span>
        </button>
        <Link href={`/post/${post.id}`}>
          <div className={`text-secondary-50 ${actionClassname}`}>
            <div
              className={`rounded-full p-2 transition-colors duration-150 ${actionIconColorClassnames.secondary}`}
            >
              <BsFillChatSquareFill />
            </div>
            <span className="ml-1 font-semibold">{post.commentsCount}</span>
          </div>
        </Link>
        {me && me.id === post.creator.id && (
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
              <>
                <Menu.Button className="text-md text-accent focus:outline-none">
                  <div className={`text-accent ${actionClassname}`}>
                    <div
                      className={`rounded-full p-2 transition-colors duration-150 ${actionIconColorClassnames.accent}`}
                    >
                      <CgMoreAlt />
                    </div>
                  </div>
                </Menu.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-in duration-100"
                  enterFrom="transform opacity-0"
                  enterTo="transform opacity-100"
                  leave="transition ease-out duration-75"
                  leaveFrom="transform opacity-100"
                  leaveTo="transform opacity-0"
                >
                  <Menu.Items
                    static
                    className="absolute z-20 right-0 w-40 origin-top-right bg-secondary-50 rounded-xl focus:outline-none"
                  >
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-secondary-600 text-secondary-50"
                                : "text-secondary-600"
                            } group flex rounded-md items-center w-full p-1.5 text-xs font-bold space-x-1.5`}
                            onClick={() => setDelModalOpen(true)}
                          >
                            <HiTrash />
                            <span>Delete...</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        )}
      </div>
      {/* Confirm modal */}
      {me && me.id === post.creator.id && (
        <MyDialog
          title="Proceed deleting this post?"
          body={`Clicking "Delete" button, all likes and comments of this post will be deleted. Any further action, will not be able to be undone.`}
          buttons={
            <>
              <MyButton
                color="danger"
                isLoading={deletePostLoading}
                onClick={DeletePostHandler}
              >
                Delete
              </MyButton>
              <MyButton color="primary" onClick={() => setDelModalOpen(false)}>
                Cancel
              </MyButton>
            </>
          }
          isOpen={isDelModalOpen}
          onClose={() => setDelModalOpen(false)}
        />
      )}
    </div>
  );
};
