import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, ReactNode } from "react";

type Props = {
  isOpen: boolean;
  close?: () => void;
  children: ReactNode;
};

const Modal: FC<Props> = ({ isOpen, children, close }) => {
  const handleClose = () => {
    close?.();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="aside" className="relative z-[292929]" onClose={handleClose}>
        {/* overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <button
            className="fixed inset-0 bg-[rgba(0,0,0,0.25)] bg-opacity-75 transition-opacity backdrop-blur-[1.375rem] w-screen h-screen"
            onClick={() => {
              close?.();
            }}
          />
        </Transition.Child>

        {/* main modal container */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center sm:p-0 items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {/* main modal panel */}
              <Dialog.Panel className="relative transform overflow-hidden rounded-[4px] p-6 bg-white text-left shadow-xl transition-all w-[480px] max-w-[95%] h-max max-h-[90vh]">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
