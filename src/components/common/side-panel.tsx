"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface SidePanelProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  id?: string;
}

export function SidePanel({
  title,
  children,
  open,
  onClose,
  id,
}: SidePanelProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-10"
      data-testid={id}
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col text-white overflow-y-scroll bg-black py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-white">
                      {title}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md text-white hover:text-gray-500 
                        focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6 text-white">
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
