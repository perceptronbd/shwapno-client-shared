"use client";

import { FC, useEffect, useRef } from "react";

type ModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: FC<ModalProps> = ({
  className = "",
  isOpen,
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`fixed inset-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm transition-transform duration-300 ${
        isOpen ? "scale-100" : "hidden scale-50"
      } ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={overlayRef}
        className="relative mx-auto flex w-full max-w-lg justify-center bg-white shadow-lg rounded-lg p-4"
      >
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </dialog>
  );
};
