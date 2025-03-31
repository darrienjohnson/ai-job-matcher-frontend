"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ResumeModal({ isOpen, onClose, resume, onConfirm }) {
  if (!resume) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] flex flex-col">
              <Dialog.Title className="text-lg font-bold text-gray-900 mb-4">
                Parsed Resume Preview
              </Dialog.Title>

              {/* ✅ Scrollable Full Resume Text */}
              <div className="flex-1 overflow-y-auto border rounded bg-gray-50 text-gray-800 p-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {resume.rawText}
                </pre>
              </div>

              {/* ✅ Buttons below the preview */}
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  ❌ No, re-upload
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  ✅ Yes, looks correct
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
