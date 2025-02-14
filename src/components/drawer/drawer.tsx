"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "../buttons/button";
import { Icons } from "../../icons/index";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  isCrossVisible?: boolean;
}

export const Drawer = ({
  isOpen,
  onClose,
  children,
  isCrossVisible = true,
}: DrawerProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle focus trapping when the drawer opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[70] flex items-end justify-center bg-black/85 text-white transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`relative h-[80%] w-full transform rounded-t-xl bg-neutral-50 px-8 py-6 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {isCrossVisible && (
          <Button
            onClick={onClose}
            className="absolute right-4 top-4 h-10 w-10 rounded-full bg-neutral-100 p-0 text-neutral-400 hover:bg-neutral-300"
            aria-label="Close Drawer"
          >
            <Icons.X size={22} />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};
