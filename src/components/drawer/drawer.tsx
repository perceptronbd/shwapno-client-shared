"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "../buttons/button";
import { Icons } from "../../Icons/index";

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
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full h-[80%] bg-neutral-50 py-6 px-8 shadow-lg transform transition-transform duration-300 rounded-t-xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {isCrossVisible && (
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 p-0 bg-neutral-100 hover:bg-neutral-300 rounded-full text-neutral-400"
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
