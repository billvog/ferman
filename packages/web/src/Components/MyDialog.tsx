import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useScreenType } from "../shared-hooks/useScreenType";
import { MdClose } from "react-icons/md";

interface MyDialogProps {
  title: JSX.Element | string;
  body?: JSX.Element | string;
  buttons?: JSX.Element;
  isOpen: boolean;
  onClose: () => any;
}

export const MyDialog: React.FC<MyDialogProps> = (props) => {
  const screenType = useScreenType();

  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto backdrop-filter backdrop-blur-sm bg-black bg-opacity-20"
        static
        open={props.isOpen}
        onClose={props.onClose}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
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
            enter="duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="relative inline-block w-full fullscreen:max-w-md p-6 fullscreen:my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl fullscreen:rounded-2xl">
              <Dialog.Title
                as="h3"
                className="flex items-center justify-between text-lg font-medium leading-6 text-primary-900"
              >
                <span>{props.title}</span>
              </Dialog.Title>
              <div>
                {typeof props.body === "undefined" &&
                typeof props.buttons === "undefined" ? (
                  <>{props.children}</>
                ) : (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-primary-500">{props.body}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">{props.buttons}</div>
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
