import {
  FullCommentFragment,
  FullUserFragment,
  useDeleteCommentMutation,
} from "@ferman-pkgs/controller";
import React, { Fragment, useState } from "react";
import { BsFillChatSquareFill } from "react-icons/bs";
import { MyButton } from "./MyButton";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import { HiTrash } from "react-icons/hi";
import { CgMoreAlt } from "react-icons/cg";
import { MyDialog } from "./MyDialog";
import Link from "next/link";

const actionClassname =
  "flex items-center border-none outline-none cursor-pointer disabled:cursor-default bg-transparent group";

const actionIconColorClassnames = {
  secondary: "group-hover:bg-secondary-transparent",
  accent: "group-hover:bg-accent-transparent",
};

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
  const [isDelModalOpen, setDelModalOpen] = useState(false);

  const [
    deleteComment,
    { loading: deleteCommentLoading },
  ] = useDeleteCommentMutation();

  const DeleteCommentHandler = async () => {
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
  };

  return (
    <div className="p-1 bg-primary-50 rounded-b-xl">
      <div className="flex justify-center items-center space-x-7 text-xs leading-none">
        <Link href={`/post/${comment.postId}/comment/${comment.id}`}>
          <div className={`text-secondary-50 ${actionClassname}`}>
            <div
              className={`rounded-full p-2 transition-colors duration-150 ${actionIconColorClassnames.secondary}`}
            >
              <BsFillChatSquareFill />
            </div>
            <span className="ml-1.5 font-semibold">{comment.repliesCount}</span>
          </div>
        </Link>
        {me && me.id === comment.user.id && (
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
                    className="absolute z-20 right-0 w-40 mt-2 origin-top-right bg-secondary-50 rounded-xl focus:outline-none"
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
      {/* Confirm delete modal */}
      {me && me.id === comment.user.id && (
        <MyDialog
          title="Proceed deleting this comment?"
          body={`Clicking "Delete" button, all replies of this comment will be deleted. Any further action, will not be able to be undone.`}
          buttons={
            <>
              <MyButton
                color="danger"
                isLoading={deleteCommentLoading}
                onClick={DeleteCommentHandler}
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
