import {
  FullMessageFragment,
  FullUserFragment,
  useDeleteMessageMutation,
  useMarkMessageReadMutation,
} from "@ferman-pkgs/controller";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";
import { Waypoint } from "react-waypoint";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

interface ChatMessageProps {
  me: FullUserFragment;
  message: FullMessageFragment;
  showRead: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  me,
  message,
  showRead = false,
}) => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();
  const isMe = me.id === message.userId;

  const [markRead] = useMarkMessageReadMutation();
  const [deleteMessage, { client }] = useDeleteMessageMutation();

  return (
    <Waypoint
      onEnter={async () => {
        if (message.userId === me.id || message.read) return;
        markRead({
          variables: {
            chatId: message.chatId,
            messageId: message.id,
          },
        });
      }}
    >
      <div
        className={`flex ${
          isMe ? "flex-row-reverse" : "flex-row"
        } justify-between w-full`}
      >
        <div
          className={`p-1.5 flex flex-col ${
            isMe ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`flex items-start ${
              isMe ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div>
              {!isMe && (
                <div className="mr-3 min-w-max">
                  <img
                    src={message.user.profile?.avatarUrl}
                    className="w-7 h-7 rounded-35 cursor-pointer"
                    onClick={() => router.push(`/user/${message.user.uid}`)}
                  />
                </div>
              )}
            </div>
            <div
              className={`group flex flex-col ${
                isMe ? "items-end" : "items-start"
              } justify-center`}
            >
              <div className="flex items-center">
                {isMe && (
                  <Menu as="div" className="relative inline-block text-left">
                    {({ open }) => (
                      <>
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
                            className="absolute z-20 right-2 -top-2.5 w-36 origin-bottom-right bg-secondary-50 rounded-xl focus:outline-none"
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
                                    onClick={() =>
                                      deleteMessage({
                                        variables: {
                                          chatId: message.chatId,
                                          messageId: message.id,
                                        },
                                      })
                                    }
                                  >
                                    <HiTrash size="14px" />
                                    <span>{t("button.delete")}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                        <Menu.Button className="focus:outline-none flex items-center justify-center">
                          <div
                            className={`${
                              open ? "" : "opacity-0"
                            } group-hover:opacity-100 mr-2.5`}
                          >
                            <div className="cursor-pointer text-primary-500 hover:text-primary-400">
                              <FiMoreHorizontal size="16px" />
                            </div>
                          </div>
                        </Menu.Button>
                      </>
                    )}
                  </Menu>
                )}
                <div
                  className={`text-md text-primary-500 ${
                    isMe
                      ? "border border-primary-100 bg-primary-50"
                      : "bg-primary-100"
                  } px-3.5 py-2 rounded-3xl table table-fixed whitespace-pre-wrap break-word`}
                >
                  {message.text}
                </div>
              </div>
              {showRead && isMe && message.read && (
                <div className="mt-2 mx-2">
                  <div className="text-xs text-primary-400">Read</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Waypoint>
  );
};
