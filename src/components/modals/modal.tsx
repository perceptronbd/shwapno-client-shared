"use client";

import { Button } from "../buttons/button";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { useClickOutside } from "../../hooks/useClickOutside";
import { X } from "lucide-react";

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
    onClose(false),
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
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={overlayRef}
        className={cn(
          "relative mx-auto flex w-full justify-center",
          overlayClassName,
        )}
      >
        {children}
        {isCrossVisible && (
          <Button
            onClick={() => onClose(false)}
            className="absolute right-4 top-4 rounded-full bg-neutral-100 p-2 text-neutral-400 hover:bg-neutral-300"
            aria-label="Close Drawer"
          >
            <X size={16} />
          </Button>
        )}
      </div>
    </dialog>
  );
};
