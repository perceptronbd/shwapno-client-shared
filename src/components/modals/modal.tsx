"use client";

import { Icons } from "../../icons/index";
import { Button } from "../buttons/button";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { useClickOutside } from "../../hooks/useClickOutside";

type ModalProps = {
  className?: string;
  overlayClassName?: string;
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  isCrossVisible?: boolean;
};

export const Modal = ({
  overlayClassName = "",
  className = "",
  isOpen,
  onClose,
  children,
  isCrossVisible = true,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useClickOutside(overlayRef as React.RefObject<HTMLDivElement>, () =>
    onClose(false)
  );

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

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
            onClick={() => onClose(false)}
            className="absolute top-4 right-4 p-2 bg-neutral-100 hover:bg-neutral-300 rounded-full text-neutral-400"
            aria-label="Close Drawer"
          >
            <Icons.X size={16} />
          </Button>
        )}
      </div>
    </dialog>
  );
};
