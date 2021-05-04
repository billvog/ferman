import PostActionsStyles from "../css/post-actions.module.css";
import { toast } from "react-toastify";
import React, { Fragment, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillChatSquareFill } from "react-icons/bs";
import { HiTrash } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import {
  FullPostFragment,
  FullUserFragment,
  useDeletePostMutation,
  useLikePostMutation,
} from "@ferman-pkgs/controller";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Modal from "react-modal";
import { CenteredModalOptions, ModalStyles } from "../utils/modalOptions";
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
    <div className="p-2 bg-gray-100 rounded-b-xl">
      <div className="flex items-center justify-between text-xs leading-none">
        <div className="flex items-center">
          <div>
            <button
              className="flex items-center border-none outline-none cursor-pointer text-red-400 bg-transparent disabled:cursor-default disabled:text-gray-400 hover:red-text-shadow disabled:no-text-shadow transition-all duration-150"
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
              <span className="ml-1.5">{post.points}</span>
            </button>
          </div>
          <div className="flex items-center ml-3 pl-3 border-l">
            <BsFillChatSquareFill color="burlywood" />
            <span className="ml-1.5 text-gray-500 font-semibold">
              {post.commentsCount}
            </span>
          </div>
        </div>
        <div>
          {me && me.id === post.creator.id && (
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="flex justify-center space-x-1 font-semibold text-accent bg-transparent hover:text-accent-washed-out focus:outline-none">
                      <span>Actions</span>
                      <BiChevronDown />
                    </Menu.Button>
                  </div>
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
                      className="absolute right-0 w-40 mt-2 origin-top-right bg-primary-50 rounded-xl"
                    >
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-primary-600 text-primary-50"
                                  : "text-primary-600"
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
      </div>
      {/* Confirm modal */}
      {me && me.id === post.creator.id && (
        <Transition show={isDelModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-md bg-black bg-opacity-20"
            static
            open={isDelModalOpen}
            onClose={() => setDelModalOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Proceed deleting this post?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Clicking "Delete" button, all likes and comments of this
                      post will be deleted. Any further action, will not be able
                      to be undone.
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <MyButton
                      color="danger"
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
                    <MyButton
                      color="secondary"
                      onClick={() => setDelModalOpen(false)}
                    >
                      Cancel
                    </MyButton>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};
