import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface MyDialogProps {
  title: JSX.Element | string;
  body: JSX.Element | string;
  buttons: JSX.Element;
  isOpen: boolean;
  onClose: () => any;
}

export const MyDialog: React.FC<MyDialogProps> = (props) => {
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-md bg-black bg-opacity-20"
        static
        open={props.isOpen}
        onClose={props.onClose}
      >
        <div className="min-h-screen xs:px-4 text-center">
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
            <div className="inline-block w-full max-w-full xs:max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl xs:rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {props.title}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{props.body}</p>
              </div>
              <div className="mt-4 flex space-x-2">{props.buttons}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};