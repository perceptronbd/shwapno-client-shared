"use client";

import { Icons } from "../../icons/index";
import { Button } from "../buttons/button";
import { FC, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";

type ModalProps = {
  className?: string;
  overlayClassName?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isCrossVisible?: boolean;
};

export const Modal: FC<ModalProps> = ({
  overlayClassName = "",
  className = "",
  isOpen,
  onClose,
  children,
  isCrossVisible = true,
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
      className={cn(
        "fixed inset-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm transition-transform duration-300",
        isOpen ? "scale-100" : "hidden scale-50",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={overlayRef}
        className={cn(
          "relative mx-auto flex w-full max-w-lg justify-center bg-white shadow-lg rounded-sm p-4",
          overlayClassName
        )}
      >
        {children}
        {isCrossVisible && (
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 p-0 bg-neutral-100 hover:bg-neutral-300 rounded-full text-neutral-400"
            aria-label="Close Drawer"
          >
            <Icons.X size={22} />
          </Button>
        )}
      </div>
    </dialog>
  );
};
